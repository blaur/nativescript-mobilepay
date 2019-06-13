import { AndroidActivityResultEventData, android as androidApp } from 'tns-core-modules/application';
import {
    MobilePayBase
} from './mobilepay.common';
const Big = require('big.js');

declare var dk: any;

export class MobilePay extends MobilePayBase {
    private static MOBILEPAY_PAYMENT_REQUEST_CODE = 1337;
    public paymentCallback: any;

    createMobilePayInstance(merchantId: string): any {
        dk.danskebank.mobilepay.sdk.MobilePay.getInstance().init(
            merchantId, dk.danskebank.mobilepay.sdk.Country.DENMARK);
        return dk.danskebank.mobilepay.sdk.MobilePay.getInstance();
    }

    isMobilePayInstalled(merchantId: string): boolean {
        return this.createMobilePayInstance(merchantId).isMobilePayInstalled(androidApp.context);
    }

    MakePayment(merchantId: string, price: number, accountId: string): void {

        let payment = new dk.danskebank.mobilepay.sdk.model.Payment();
        let bigDecimalPrice = new Big(price).toPrecision(2);
        let javaBig = new java.math.BigDecimal(bigDecimalPrice);
        payment.setProductPrice(javaBig);
        payment.setOrderId(accountId);

        let mobilePayInstance = this.createMobilePayInstance(merchantId);
        let paymentIntent = mobilePayInstance.createPaymentIntent(payment);

        let isMobilePayInstalled = mobilePayInstance.isMobilePayInstalled(androidApp.context);
        if(!isMobilePayInstalled) {
            return;
        }

        (androidApp.foregroundActivity || androidApp.startActivity).startActivityForResult(
            paymentIntent,
            MobilePay.MOBILEPAY_PAYMENT_REQUEST_CODE);

        const resultCallback = new PaymentCallback(this);
        const resultEvent = "activityResult";

        const callback = (eventData: AndroidActivityResultEventData) => {
            if (eventData.requestCode === MobilePay.MOBILEPAY_PAYMENT_REQUEST_CODE) {
                androidApp.off(resultEvent, callback);

                mobilePayInstance.handleResult(eventData.resultCode, eventData.intent, resultCallback);
            }
        };
        androidApp.on(resultEvent, callback);
    }

    onPaymentSuccess(successResult: any): void {
    }

    onPaymentFailure(failureResult: any): void {
    }

    onPaymentCancel(): void {
    }
}

class PaymentCallback extends dk.danskebank.mobilepay.sdk.ResultCallback {

    private _mobilePay: MobilePay;

    constructor(mobilePay: MobilePay) {
        super();
        this._mobilePay = mobilePay;
        return global.__native(this);
    }

    onSuccess(successResult: any) {
        console.log("We had a successful payment");
        this._mobilePay.onPaymentSuccess(successResult);
    }

    onFailure(failureResult: any) {
        console.log("We had a successful payment");
        this._mobilePay.onPaymentFailure(failureResult);
    }

    onCancel() {
        console.log("Payment was cancelled");
        this._mobilePay.onPaymentCancel();
    }
}
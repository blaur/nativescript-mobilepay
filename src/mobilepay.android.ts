import { AndroidActivityResultEventData, android as androidApp } from 'tns-core-modules/application';
import {
    MobilePayBase
} from './mobilepay.common';

declare var dk: any;

export class MobilePay extends MobilePayBase {

    private static MOBILEPAY_PAYMENT_REQUEST_CODE = 1337;

    createMobilePayInstance(merchantId: string): any {
        dk.danskebank.mobilepay.sdk.MobilePay.getInstance().init(
            merchantId, dk.danskebank.mobilepay.sdk.Country.DENMARK);
        return dk.danskebank.mobilepay.sdk.MobilePay.getInstance();
    }

    isMobilePayInstalled(merchantId: string): boolean {
        return this.createMobilePayInstance(merchantId).isMobilePayInstalled(androidApp.context);
    }

    MakePayment(merchantId: string, price: number, accountId: string): void {
        let payment = dk.danskebank.mobilepay.sdk.model.Payment();
        payment.setProductPrice(price);
        payment.setOrderId(accountId);

        let mobilePayInstance = this.createMobilePayInstance(merchantId);
        let paymentIntent = mobilePayInstance.createPaymentIntent(payment);

        let isMobilePayInstalled = mobilePayInstance.isMobilePayInstalled(androidApp.context);
        if(!isMobilePayInstalled) {
            // throw error
        }

        (androidApp.foregroundActivity || androidApp.startActivity).startActivityForResult(
            paymentIntent,
            MobilePay.MOBILEPAY_PAYMENT_REQUEST_CODE);

        const resultCallback = dk.danskebank.mobilepay.sdk.ResultCallback.extend({
            onSuccess: successResult => {
                console.log("We had a successful payment");
            },
            onFailure: failureResult => {
                console.log("Payment failed");
            },
            onCancel: () => {
                console.log("Payment was cancelled");
            }
        });

        const resultEvent = "activityResult";

        const callback = (eventData: AndroidActivityResultEventData) => {
            if (eventData.requestCode === MobilePay.MOBILEPAY_PAYMENT_REQUEST_CODE) {
                androidApp.off(resultEvent, callback);

                mobilePayInstance.handleResult(eventData.resultCode, eventData.intent, resultCallback);
            }
        };
        androidApp.on(resultEvent, callback);
    }

}

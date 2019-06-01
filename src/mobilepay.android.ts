import { AndroidActivityResultEventData, android as androidApp } from 'tns-core-modules/application';
import {
    MobilePayBase
} from './mobilepay.common';

declare var dk: any;

export class MobilePay extends MobilePayBase {

    private static MOBILEPAY_PAYMENT_REQUEST_CODE = 1337;

    createMobilePayInstance(merchantId: string): any {
        return dk.danskebank.mobilepay.sdk.MobilePay.getInstance(
            merchantId, dk.danskebank.mobilepay.sdk.Country.DENMARK);
    }

    isMobilePayInstalled(merchantId: string): boolean {
        return this.createMobilePayInstance(merchantId).isMobilePayInstalled(androidApp.context);
    }

    MakePayment(merchantId: string, price: number, accountId: string): void {
        let payment = dk.danskebank.mobilepay.sdk.model.Payment();
        payment.setProductPrice(price);
        payment.setOrderId(accountId);

        let paymentIntent = this.createMobilePayInstance(merchantId).createPaymentIntent(payment);

        let isMobilePayInstalled = this.createMobilePayInstance(merchantId).isMobilePayInstalled(androidApp.context);

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

                this.createMobilePayInstance(merchantId).handleResult(eventData.resultCode, eventData.intent, resultCallback);
            }
        };
        androidApp.on(resultEvent, callback);
    }

}

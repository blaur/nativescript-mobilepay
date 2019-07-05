/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />
/// <reference path="./typings/MobilePayManager.d.ts" />
import { AndroidActivityResultEventData, ios as iosApp } from 'tns-core-modules/application';

import { MobilePayBase } from './mobilepay.common';

export class MobilePay extends MobilePayBase {
    public mobilePayManager: MobilePayManager;
    public paymentCallback: any;
    private static MOBILEPAY_PAYMENT_REQUEST_CODE = 1337;

    createMobilePayInstance(merchantId: string): any {
        this.mobilePayManager = MobilePayManager.alloc().setupWithMerchantId(
            merchantId, 'nativescriptmobilepay',
            MobilePayCountry.MobilePayCountry_Denmark
        );
        this.mobilePayManager.setTimeoutSeconds(90);

        return this.mobilePayManager;
    }

    isMobilePayInstalled(merchantId: string): boolean {
        return this.mobilePayManager.isMobilePayInstalled(MobilePayCountry.MobilePayCountry_Denmark);
    }

    MakePayment(merchantId: string, price: number, accountId: string): void {
        let mobilePayment = this.mobilePayManager.initWithOrderId(accountId, price);

        if(mobilePayment && (mobilePayment.orderId.length > 0) && (mobilePayment.productPrice > 0)) {

            this.mobilePayManager.handleMobilePayCallbacksWithUrl(
                this.mobilePayManager.mobilePayAppStoreLinkDK,
                this.onPaymentSuccess, this.onPaymentFailure);

            this.mobilePayManager.beginMobilePaymentWithPayment(mobilePayment, (error) => this.onPaymentFailure(error));
        }
    }

    onPaymentSuccess(successResult: any): void {
    }

    onPaymentFailure(failureResult: any): void {
    }

    onPaymentCancel(): void {
    }

}
import { MobilePayBase } from './mobilepay.common';

export declare class MobilePay extends MobilePayBase {
    createMobilePayInstance(merchantId: string): any;

    isMobilePayInstalled(merchantId: string): boolean;

    MakePayment(merchantId: string, price: number, accountId: string): any;

    onPaymentSuccess(successResult: any): void;

    onPaymentFailure(successResult: any): void;

    onPaymentCancel(): void;
}
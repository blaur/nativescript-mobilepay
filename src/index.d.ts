import { MobilePayBase } from './mobilepay.common';

export declare class MobilePay extends MobilePayBase {
    createMobilePayInstance(merchantId: string): any;

    isMobilePayInstalled(merchantId: string): boolean;

    MakePayment(merchantId: string, price: number, accountId: string): any;

    addDelegate(): void;

    static onPaymentSuccess(successResult: any): void;

    static onPaymentFailure(successResult: any): void;

    static onPaymentCancel(): void;
}

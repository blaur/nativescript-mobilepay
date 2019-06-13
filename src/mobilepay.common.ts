export abstract class MobilePayBase {
    public paymentCallback: any;

    public abstract createMobilePayInstance(merchantId: string): any;
    public abstract isMobilePayInstalled(merchantId: string): boolean;
    public abstract MakePayment(merchantId: string, price: number, accountId: string): void;

    public abstract onPaymentSuccess(successResult: any): void;
    public abstract onPaymentFailure(successResult: any): void;
    public abstract onPaymentCancel(): void;
}
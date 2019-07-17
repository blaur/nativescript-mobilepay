export abstract class MobilePayBase {
    public paymentCallback: any;

    public abstract createMobilePayInstance(merchantId: string): any;
    public abstract isMobilePayInstalled(merchantId: string): boolean;
    public abstract MakePayment(merchantId: string, price: number, accountId: string): void;
    public abstract addDelegate(): void;

   // public abstract onPaymentSuccess(successResult: any): void;
   // public abstract onPaymentFailure(successResult: any): void;
   // public abstract onPaymentCancel(): void;

    public static onPaymentSuccess(successResult: any): void {
        console.log("WE DID PAY???");
    }

    public static onPaymentFailure(failureResult: any): void {
        console.log("WE DID FAIL???");
    }

    public static onPaymentCancel(): void {
        console.log("WE DID CANCEL???");
    }
}
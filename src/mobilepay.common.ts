export abstract class MobilePayBase {
    public abstract createMobilePayInstance(merchantId: string): any;
    public abstract isMobilePayInstalled(merchantId: string): boolean;
    public abstract MakePayment(merchantId: string, price: number, accountId: string): void;
}
import { MobilePayBase } from './mobilepay.common';

export class MobilePay extends MobilePayBase {

    private static MOBILEPAY_PAYMENT_REQUEST_CODE = 1337;

    createMobilePayInstance(merchantId: string): any {
        return null;
    }

    isMobilePayInstalled(merchantId: string): boolean {
        return false;
    }

    MakePayment(merchantId: string, price: number, accountId: string): void {

    }

}

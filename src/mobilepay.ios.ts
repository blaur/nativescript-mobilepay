/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />
/// <reference path="./typings/MobilePayManager.d.ts" />

import { MobilePayBase } from './mobilepay.common';

export class MobilePay extends MobilePayBase {
    public mobilePayManager: MobilePayManager;
    private static MOBILEPAY_PAYMENT_REQUEST_CODE = 1337;

    createMobilePayInstance(merchantId: string): any {
        if(!this.isMobilePayInstalled(merchantId)) {
            return null;
        }

        this.mobilePayManager = MobilePayManager.alloc().setupWithMerchantId(
            merchantId, 'nativescriptmobilepay',
            MobilePayCountry.MobilePayCountry_Denmark
        );

        return this.mobilePayManager;
    }

    isMobilePayInstalled(merchantId: string): boolean {
        return this.mobilePayManager.isMobilePayInstalled(MobilePayCountry.MobilePayCountry_Denmark);
    }

    MakePayment(merchantId: string, price: number, accountId: string): void {

    }

}

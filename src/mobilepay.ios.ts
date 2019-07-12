/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />
/// <reference path="./platforms/ios/typings/MobilePayManager.d.ts" />
import { ios as iosApp } from 'tns-core-modules/application';
import { MobilePayBase } from './mobilepay.common';

export class MobilePay extends MobilePayBase {
    public paymentCallback: any;
    private static MOBILEPAY_PAYMENT_REQUEST_CODE = 1337;

    createMobilePayInstance(merchantId: string): any {

        MobilePayManager.sharedInstance().setupWithMerchantIdMerchantUrlSchemeCountry(
            merchantId, 'nativescriptmobilepay', MobilePayCountry.MobilePayCountry_Denmark);

        // Callbacks for mobile pay
        const handleCallbacks = (url: NSURL): boolean => {
            console.log("We are handling a callback");
            console.dir(url);
            MobilePayManager.sharedInstance().handleMobilePayCallbacksWithUrlSuccessErrorCancel(
                url, this.onPaymentSuccess, this.onPaymentFailure, this.onPaymentCancel);

            return true;
        };

        // Create Delegate and fill in all methods
        const appDelegate = new CustomAppDelegate();
        appDelegate.applicationHandleOpenURL = (aplication: UIApplication, url: NSURL) => handleCallbacks(url);
        appDelegate.openURL = (url: NSURL) => handleCallbacks(url);
        appDelegate.applicationOpenURLSourceApplicationAnnotation = (application: UIApplication, url: NSURL, sourceApplication: string, annotation: any) => handleCallbacks(url);
        appDelegate.applicationOpenURLOptions = (app: UIApplication, url: NSURL, options: NSDictionary<string, any>) => handleCallbacks(url);
        iosApp.delegate = appDelegate;

        return MobilePayManager.sharedInstance();
    }

    isMobilePayInstalled(merchantId: string): boolean {
        return MobilePayManager.sharedInstance().isMobilePayInstalled;
    }

    MakePayment(merchantId: string, price: number, accountId: string): void {
        if (accountId.length > 0 && price > 0) {

            MobilePayManager.sharedInstance().handleMobilePayCallbacksWithUrlSuccessErrorCancel(
                'nativescriptmobilepay', this.onPaymentSuccess, this.onPaymentFailure, this.onPaymentCancel);

            MobilePayManager.sharedInstance().beginMobilePaymentWithOrderIdProductPriceReceiptMessageError(
                accountId,
                price,
                "Tillykke, du har betalt!",
                (error) => this.onPaymentFailure(error));
        }
    }

    onPaymentSuccess(successResult: any): void {
        console.log("WE DID PAY???");
    }

    onPaymentFailure(failureResult: any): void {
    }

    onPaymentCancel(): void {
        console.log("WE DID CANCEL???");
    }

}

export class CustomAppDelegate extends UIResponder implements UIApplicationDelegate {

    public openURL(url: NSURL): boolean {
        console.log("we are here or what?");
        return true;
    }

    public applicationHandleOpenURL(application: UIApplication, url: NSURL): boolean {
        console.log("we are here or what?");
        return true;
    }

    public applicationOpenURLOptions(app: UIApplication, url: NSURL, options: NSDictionary<string, any>): boolean {
        console.log("we are here or what?");
        return true;
    }


    public applicationOpenURLSourceApplicationAnnotation(application: UIApplication, url: NSURL, sourceApplication: string, annotation: any): boolean {
        console.log("we are here or what?");
        return true;
    }

}
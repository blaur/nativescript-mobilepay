/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />
/// <reference path="./platforms/ios/typings/MobilePayManager.d.ts" />
import { ios as iosApp } from 'tns-core-modules/application';
import { MobilePayBase } from './mobilepay.common';

export class MobilePay extends MobilePayBase {
    public paymentCallback: any;
    private static MOBILEPAY_PAYMENT_REQUEST_CODE = 1337;

    createMobilePayInstance(merchantId: string): any {
        // Initiate and setup
        const urlScheme = this.getAppInfo('CFBundleURLSchemes');
        MobilePayManager.sharedInstance().setupWithMerchantIdMerchantUrlSchemeCountry(
            merchantId, urlScheme.firstObject, MobilePayCountry.MobilePayCountry_Denmark);

        return MobilePayManager.sharedInstance();
    }

    isMobilePayInstalled(merchantId: string): boolean {
        return MobilePayManager.sharedInstance().isMobilePayInstalled;
    }

    MakePayment(merchantId: string, price: number, accountId: string): void {
        if (accountId.length > 0 && price > 0) {

            MobilePayManager.sharedInstance().beginMobilePaymentWithOrderIdProductPriceReceiptMessageError(
                accountId,
                price,
                "Tillykke, du har betalt!",
                (error: any) => MobilePay.onPaymentFailure(error));
        }
    }

    public addDelegate(): void {
        this.addDelegateMethods();
    }

    private getAppInfo(key: string) {
        const urlTypes = NSBundle.mainBundle.infoDictionary.mutableArrayValueForKey("CFBundleURLTypes");
        return urlTypes !== null ? urlTypes.firstObject.objectForKey(key) : '';
    }

    private getAppDelegate() {
        // Play nice with other plugins by not completely ignoring anything already added to the appdelegate
        if (iosApp.delegate === undefined) {

            @ObjCClass(UIApplicationDelegate)
            class UIApplicationDelegateImpl extends UIResponder implements UIApplicationDelegate {
            }

            iosApp.delegate = UIApplicationDelegateImpl;
        }
        return iosApp.delegate;
    }

    private addDelegateMethods() {
        let appDelegate = this.getAppDelegate();

        appDelegate.prototype.applicationDidFinishLaunchingWithOptions = (application, launchOptions) => {
            console.log("applicationDidFinishLaunchingWithOptions");
            return true;
        };

        appDelegate.prototype.applicationHandleOpenURL = (application: UIApplication, url: NSURL): boolean => {
            console.log("applicationHandleOpenURL");
            MobilePayManager.sharedInstance().handleMobilePayCallbacksWithUrlSuccessErrorCancel(
                url, MobilePay.onPaymentSuccess, MobilePay.onPaymentFailure, MobilePay.onPaymentCancel);
            return true;
        };

        appDelegate.prototype.applicationOpenURLOptions = (app: UIApplication, url: NSURL, options: NSDictionary<string, any>): boolean => {
            console.log("applicationOpenURLOptions");
            MobilePayManager.sharedInstance().handleMobilePayCallbacksWithUrlSuccessErrorCancel(
                url, MobilePay.onPaymentSuccess, MobilePay.onPaymentFailure, MobilePay.onPaymentCancel);
            return true;
        };

        appDelegate.prototype.openURL = (url: NSURL): boolean => {
            console.log("openURL");
            MobilePayManager.sharedInstance().handleMobilePayCallbacksWithUrlSuccessErrorCancel(
                url, MobilePay.onPaymentSuccess, MobilePay.onPaymentFailure, MobilePay.onPaymentCancel);
            return true;
        };

        appDelegate.prototype.applicationOpenURLSourceApplicationAnnotation = (application: UIApplication, url: NSURL, sourceApplication: string, annotation: any): boolean => {
            console.log("applicationOpenURLSourceApplicationAnnotation");
            MobilePayManager.sharedInstance().handleMobilePayCallbacksWithUrlSuccessErrorCancel(
                url, MobilePay.onPaymentSuccess, MobilePay.onPaymentFailure, MobilePay.onPaymentCancel);
            return true;
        };
    }

}
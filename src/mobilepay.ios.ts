/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />
/// <reference path="./platforms/ios/typings/MobilePayManager.d.ts" />
import { ios as iosApp } from 'tns-core-modules/application';
import { MobilePayBase } from './mobilepay.common';

export class MobilePay extends MobilePayBase {
    public paymentCallback: any;
    private static MOBILEPAY_PAYMENT_REQUEST_CODE = 1337;

    createMobilePayInstance(merchantId: string): any {

        // Callbacks for mobile pay
        const handleCallbacks = (url: NSURL): boolean => {
            console.log("We are handling a callback");
            console.dir(url);
            MobilePayManager.sharedInstance().handleMobilePayCallbacksWithUrlSuccessErrorCancel(
                url, this.onPaymentSuccess, this.onPaymentFailure, this.onPaymentCancel);

            return true;
        };

        // Create Delegate and fill in all methods
       /* const appDelegate = new CustomAppDelegate();
        appDelegate.applicationHandleOpenURL = (aplication: UIApplication, url: NSURL) => handleCallbacks(url);
        appDelegate.openURL = (url: NSURL) => handleCallbacks(url);
        appDelegate.applicationOpenURLSourceApplicationAnnotation = (application: UIApplication, url: NSURL, sourceApplication: string, annotation: any) => handleCallbacks(url);
        appDelegate.applicationOpenURLOptions = (app: UIApplication, url: NSURL, options: NSDictionary<string, any>) => handleCallbacks(url);
        appDelegate.openURLOptionsCompletionHandler = (url: NSURL, options: NSDictionary<string, any>, completion: (p1: boolean) => void) => handleCallbacks(url);
        iosApp.delegate = appDelegate;*/

        /*handleOpenURL((appURL: AppURL) => {
            console.log('Got the following appURL', appURL);
            console.log('The url os: ' + appURL.toString());
            MobilePayManager.sharedInstance().handleMobilePayCallbacksWithUrlSuccessErrorCancel(
                NSURL.URLWithString(appURL.toString()), this.onPaymentSuccess, this.onPaymentFailure, this.onPaymentCancel);
          });*/

          this.addDelegateMethods();
  //        console.log("we wish to log app delegate:");
    //      console.dir(iosApp.delegate !== undefined);
      //    console.dir(iosApp.delegate.prototype);

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

           /* const urlName = this.getAppInfo('CFBundleURLName');
            MobilePayManager.sharedInstance().handleMobilePayCallbacksWithUrlSuccessErrorCancel(
                NSURL.URLWithString(urlName), this.onPaymentSuccess, this.onPaymentFailure, this.onPaymentCancel);*/

            MobilePayManager.sharedInstance().beginMobilePaymentWithOrderIdProductPriceReceiptMessageError(
                accountId,
                price,
                "Tillykke, du har betalt!",
                (error: any) => this.onPaymentFailure(error));
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

        console.log("er are adding this stuff to the equation lol");
          appDelegate.prototype.applicationDidFinishLaunchingWithOptions = (application, launchOptions) => {
            console.log("we are here or did finish?");
            return true;
          };

          appDelegate.prototype.applicationHandleOpenURL = (application: UIApplication, url: NSURL): boolean => {
            console.log("we are here or what?");
            MobilePayManager.sharedInstance().handleMobilePayCallbacksWithUrlSuccessErrorCancel(
                url, this.onPaymentSuccess, this.onPaymentFailure, this.onPaymentCancel);
            return true;
          };

          appDelegate.prototype.applicationOpenURLOptions = (app: UIApplication, url: NSURL, options: NSDictionary<string, any>): boolean => {
            console.log("we are here or what?");
            MobilePayManager.sharedInstance().handleMobilePayCallbacksWithUrlSuccessErrorCancel(
                url, this.onPaymentSuccess, this.onPaymentFailure, this.onPaymentCancel);
            return true;
          };

          appDelegate.prototype.openURL = (url: NSURL): boolean => {
            console.log("we are here or what?");
            MobilePayManager.sharedInstance().handleMobilePayCallbacksWithUrlSuccessErrorCancel(
                url, this.onPaymentSuccess, this.onPaymentFailure, this.onPaymentCancel);
            return true;
          };

          appDelegate.prototype.applicationOpenURLSourceApplicationAnnotation = (application: UIApplication, url: NSURL, sourceApplication: string, annotation: any): boolean => {
            console.log("we are here or what?");
            MobilePayManager.sharedInstance().handleMobilePayCallbacksWithUrlSuccessErrorCancel(
                url, this.onPaymentSuccess, this.onPaymentFailure, this.onPaymentCancel);
            return true;
          };
    }

}
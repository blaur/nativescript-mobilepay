# NativeScript MobilePay 1.0.8

[![npm version](https://badge.fury.io/js/nativescript-mobilepay.svg)](https://badge.fury.io/js/nativescript-mobilepay)

This plugin is a wrapper for the MobilePay AppSwitch SDK (https://github.com/MobilePayDev/MobilePay-AppSwitch-SDK). It allows your app to utilize and integrate directly with Mobile Pay if installed on the phone.

## (Optional) Prerequisites / Requirements

To use the plugin you would have create an account at MobilePay.

## Installation

Describe your plugin installation steps. Ideally it would be something like:

```javascript
    tns plugin add nativescript-mobilepay
```

## Usage 

First add the following lines to main.ts:
```javascript
    import { platformNativeScriptDynamic } from "nativescript-angular/platform";

    import { AppModule } from "./app/app.module";
    import { MobilePay } from "nativescript-mobilepay";

    // Do this for nativescript-mobilepay
    var mobilePay = new MobilePay();
    mobilePay.addDelegate();

    platformNativeScriptDynamic().bootstrapModule(AppModule);

```

Simply import the MobilePay class as shown below and start using the features.
	
```javascript
    import { Component, OnInit } from "@angular/core";
    import { MobilePay } from 'nativescript-mobilepay';
    import { isAndroid, isIOS } from 'tns-core-modules/platform';

    declare var dk: any;

   @Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
    })
    export class HomeComponent implements OnInit {

        private mobilePay: MobilePay;

        constructor() {
            // Use the component constructor to inject providers.
        }

        ngOnInit(): void {
            // Create an instance on init. Important!
            this.mobilePay = new MobilePay();
            this.mobilePay.createMobilePayInstance("APPDK0000000000");
        }

        pay() {
            const isInstalled = this.mobilePay.isMobilePayInstalled("APPDK0000000000");
            console.log("Mobile Pay installed? " + isInstalled + " Android: " + isAndroid + " iOS: " + isIOS);

            // You can choose to provide a result callback like this
            MobilePay.onPaymentSuccess = (result) => (console.log("WE MADE A SUCCESSFUL RESULT"));
            MobilePay.onPaymentFailure = (failure) => (console.log("WE MADE A FAILURE LOL"));
            MobilePay.onPaymentCancel = () => (console.log("WE MADE A SUCCESSFUL CANCEL"));

            if(isInstalled) {
                this.mobilePay.MakePayment("APPDK0000000000", 1.0, "86715c57-8840-4a6f-af5f-07ee89107ece")
            }
        }


    }


```

## API

Properties of the plugin

### createMobilePayInstance

Creates a mobile pay instance. Please see demo example.

### isMobilePayInstalled

Checks whether or not mobile pay is installed on device.

### MakePayment

Makes a payment request to mobile pay.

### onPaymentSuccess

Callback function if a payment was successful.

### onPaymentFailure

Callback if payment failed.

### onPaymentCancel()

Callback if payment was cancelled.
    
## License

Apache License Version 2.0, January 2004

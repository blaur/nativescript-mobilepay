# NativeScript MobilePay 1.0.0

Add your plugin badges here. See [nativescript-urlhandler](https://github.com/hypery2k/nativescript-urlhandler) for example.

This plugin is a wrapper for the MobilePay AppSwitch SDK (https://github.com/MobilePayDev/MobilePay-AppSwitch-SDK). It allows your app to utilize and integrate directly with Mobile Pay if installed on the phone.

## (Optional) Prerequisites / Requirements

To use the plugin you would have create an account at MobilePay.

## Installation

Describe your plugin installation steps. Ideally it would be something like:

```javascript
tns plugin add nativescript-mobilepay
```

## Usage 

Simply import the MobilePay class as shown below and start using the features.
	
	```javascript
    import { Component, OnInit } from "@angular/core";
    import { MobilePay } from 'nativescript-mobilepay';
    @Component({
        selector: "Home",
        moduleId: module.id,
        templateUrl: "./home.component.html"
    })
    export class HomeComponent implements OnInit {

        constructor() {
            // Use the component constructor to inject providers.
        }

        ngOnInit(): void {
            const mobilePay = new MobilePay();
            const isInstalled = mobilePay.isMobilePayInstalled("APPDK0000000000");
            console.log("Mobile Pay installed? " + isInstalled + " Android: " + isAndroid + " iOS: " + isIOS);

            // You can choose to provide a result callback like this
            mobilePay.onPaymentSuccess = (result) => (console.log("WE MADE A SUCCESSFUL RESULT"));
            mobilePay.onPaymentFailure = (failure) => (console.log("WE MADE A FAILURE LOL"));
            mobilePay.onPaymentCancel = () => (console.log("WE MADE A SUCCESSFUL CANCEL"));

            if(isInstalled) {
                mobilePay.MakePayment("APPDK0000000000", 1.0, "86715c57-8840-4a6f-af5f-07ee89107ece")
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

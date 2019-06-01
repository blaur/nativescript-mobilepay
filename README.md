# NativeScript MobilePay

Add your plugin badges here. See [nativescript-urlhandler](https://github.com/hypery2k/nativescript-urlhandler) for example.

This plugin is a wrapper for the MobilePay AppSwitch SDK (https://github.com/MobilePayDev/MobilePay-AppSwitch-SDK). It allows your app to utilize and integrate directly with Mobile Pay if installed on the phone.

## (Optional) Prerequisites / Requirements

To use the plugin you would have create an account at MobilePay.

## Installation

Describe your plugin installation steps. Ideally it would be something like:

```javascript
tns plugin add nativescript-angular
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
            const isInstalled = mobilePay.isMobilePayInstalled("MerchantId");

        }
    }

    ```

## API

Describe your plugin methods and properties here. See [nativescript-feedback](https://github.com/EddyVerbruggen/nativescript-feedback) for example.
    
| Property | Default | Description |
| --- | --- | --- |
| some property | property default value | property description, default values, etc.. |
| another property | property default value | property description, default values, etc.. |
    
## License

Apache License Version 2.0, January 2004

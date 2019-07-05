import { Component, OnInit } from "@angular/core";
import { MobilePay } from 'nativescript-mobilepay';
import {isAndroid, isIOS} from 'tns-core-modules/platform';

declare var dk: any;

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

    }

    pay() {
        const mobilePay = new MobilePay();
        mobilePay.createMobilePayInstance("APPDK0000000000");
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


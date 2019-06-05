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

    }

    pay() {
        const mobilePay = new MobilePay();
        const isInstalled = mobilePay.isMobilePayInstalled("APPDK0000000000");
        console.log("Mobile Pay installed? " + isInstalled);

        if(isInstalled) {
            mobilePay.MakePayment("APPDK0000000000", 1.0, "86715c57-8840-4a6f-af5f-07ee89107ece")
        }
    }
}

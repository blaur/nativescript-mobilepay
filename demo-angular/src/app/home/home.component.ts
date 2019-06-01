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

    }
}

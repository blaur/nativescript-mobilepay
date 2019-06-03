enum MobilePayCountry {
    MobilePayCountry_Denmark
};

declare class MobilePayPayment extends NSObject {

}

declare class MobilePaySuccessfulPayment extends NSObject {
    orderId: string;
    transactionId: string;
    amountWithdrawnFromCard: string;
}

declare class MobilePayManager extends NSObject {
    static alloc(): MobilePayManager;

    isMobilePayInstalled(country: MobilePayCountry): boolean;

    setupWithMerchantId(setupWithMerchantId: string, merchantUrlScheme: string, country: MobilePayCountry);

    initWithOrderId(orderId: string, price: numbr): MobilePayPayment;

    beginMobilePaymentWithPayment(payment: MobilePayPayment);

    handleMobilePayPaymentWithUrl(url: string): any;
}
declare class MobilePayPayment extends NSObject {
    productPrice: number;
    orderId: string;
}

declare class MobilePaySuccessfulPayment {
    orderId: string;
    transactionId: string;
    amountWithdrawnFromCard: string;
}

declare enum MobilePayCountry {
    MobilePayCountry_Denmark
}

declare class MobilePayManager extends NSObject {
    static alloc(): MobilePayManager;

    mobilePayAppStoreLinkDK: any;

    isMobilePayInstalled(country: MobilePayCountry): boolean;

    setupWithMerchantId(setupWithMerchantId: string, merchantUrlScheme: string, country: MobilePayCountry);

    initWithOrderId(orderId: string, price: number): MobilePayPayment;

    beginMobilePaymentWithPayment(payment: MobilePayPayment, error: any);

    handleMobilePayCallbacksWithUrl(url: any, success: any, cancel: any);

    handleMobilePayPaymentWithUrl(url: string): any;

    setTimeoutSeconds(seconds: number);
}
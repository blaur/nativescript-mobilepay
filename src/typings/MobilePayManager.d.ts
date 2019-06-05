declare class MobilePayPayment extends NSObject {
    productPrice: number;
    orderId: string;
}

declare class MobilePaySuccessfulPayment extends NSObject {
    orderId: string;
    transactionId: string;
    amountWithdrawnFromCard: string;
}

enum MobilePayCountry {
    MobilePayCountry_Denmark
}

declare class MobilePayManager extends NSObject {
    static alloc(): MobilePayManager;

    isMobilePayInstalled(country: MobilePayCountry): boolean;

    setupWithMerchantId(setupWithMerchantId: string, merchantUrlScheme: string, country: MobilePayCountry);

    initWithOrderId(orderId: string, price: number): MobilePayPayment;

    beginMobilePaymentWithPayment(payment: MobilePayPayment, error: any);

    handleMobilePayPaymentWithUrl(url: string): any;

    setTimeoutSeconds(seconds: number);
}
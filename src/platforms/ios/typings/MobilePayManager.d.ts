declare class MobilePayPayment extends NSObject {
    productPrice: number;
    orderId: string;

    static alloc(): MobilePayPayment;

    initWithOrderId(orderId: string, price: number): MobilePayPayment;
}

declare class MobilePaySuccessfulPayment {
    orderId: string;
    transactionId: string;
    amountWithdrawnFromCard: string;
}

declare enum MobilePayCountry {
    MobilePayCountry_Denmark = 0
}

declare class MobilePayManager extends NSObject {
    static sharedInstance(): MobilePayManager;
    static alloc(): MobilePayManager;
    
    mobilePayAppStoreLinkDK: any;

    isMobilePayInstalled: boolean;

    setupWithMerchantIdMerchantUrlSchemeCountry(setupWithMerchantId: string, merchantUrlScheme: string, country: MobilePayCountry);

    beginMobilePaymentWithOrderIdProductPriceReceiptMessageError(orderId: string, price: number, receiptMessage: string, error: any);

    handleMobilePayCallbacksWithUrlSuccessErrorCancel(url: any, success: any, error: any, cancel: any);

    handleMobilePayPaymentWithUrl(url: string): any;

    setTimeoutSeconds(seconds: number);
}
class CheckoutPage {
    addressInformationTitle = "#order-nav";
    paymentStepButton = ".order-next-btn";
    cargoOptions = ".cargo-content";
    creditCardPaymentOption = "#iyz-tab-credit-card";
    iyzicoPaymentOption = "#iyz-tab-payWithIyzico";
    //
    cardHolderNameInput = 'input[name="cardHolderName"]';
    cardNumberInput = "#ccnumber";
    cardExpiryDateInput = "#ccexp";
    cardCvvInput = "#cccvc";

    creditCardFormInputs = [
        this.cardHolderNameInput,
        this.cardNumberInput,
        this.cardExpiryDateInput,
        this.cardCvvInput
    ];

    paymentButton = "#iyz-payment-button";
    validationErrorMessage = '[class*="ErrorMessageWrapper"]';
    orderSummary = "#order-products";
    orderPriceSummary = "#order-summary";
    orderPriceRows = "#order-summary > div";
}
export default new CheckoutPage();
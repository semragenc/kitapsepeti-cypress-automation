import ShoppingCartPage from "../pages/ShoppingCartPage";
import CheckoutPage from "../pages/CheckoutPage";

function parsePrice(priceText) {
    return Number(
        priceText
            .replace("TL", "")
            .replace(/\./g, "")
            .replace(",", ".")
            .trim()
    );
}
describe("User Story - 05 - Ödeme ve Sipariş Onayı", () => {

    beforeEach(() => {
        cy.fixture("testData").then((data) => {
            cy.loginWithSession(data.email, data.password);
        });
        cy.visit("/");
    });

    it("AC1 - Satın Al butonuna tıklandığında kullanıcı Adres Bilgileri sayfasına yönlendirilmelidir.", () => {
        cy.addProductsToCart(1);
        cy.get(ShoppingCartPage.cartPriceContainer).find(ShoppingCartPage.checkoutButton).should("be.visible").and("not.be.disabled").click();
        cy.get(CheckoutPage.addressInformationTitle).should("be.visible");

    });

    it("AC2 - Ödeme Adımına Geç butonuna tıklandığında kullanıcı Ödeme Bilgileri ekranına yönlendirilmelidir.", () => {
        cy.addProductsToCart(1);
        cy.get(ShoppingCartPage.cartPriceContainer).find(ShoppingCartPage.checkoutButton).should("be.visible").and("not.be.disabled").click();
        cy.get(CheckoutPage.addressInformationTitle).should("be.visible");
        cy.get(CheckoutPage.paymentStepButton).should("be.visible").click();
    });

    it("AC3 - Kargo seçeneklerinde PTT Kargo ve Hepsijet görüntülenmeli ve DHL Kargo varsayılan seçili olmalıdır.", () => {
        cy.addProductsToCart(2);
        cy.get(ShoppingCartPage.cartPriceContainer).find(ShoppingCartPage.checkoutButton).should("be.visible").and("not.be.disabled").click();
        cy.get(CheckoutPage.addressInformationTitle).should("be.visible");
        cy.get(CheckoutPage.paymentStepButton).should("be.visible").click();
        cy.get(CheckoutPage.cargoOptions).should("contain.text", "PTT Kargo").and("contain.text", "DHL");
    });

    it("AC4 - Ödeme sayfasında İyzico ile Öde ve Kartla Ödeme seçenekleri görüntülenmelidir.", () => {
        cy.addProductsToCart(2);
        cy.get(ShoppingCartPage.cartPriceContainer).find(ShoppingCartPage.checkoutButton).should("be.visible").and("not.be.disabled").click();
        cy.get(CheckoutPage.addressInformationTitle).should("be.visible");
        cy.get(CheckoutPage.paymentStepButton).should("be.visible").click();
        cy.get(CheckoutPage.creditCardPaymentOption, { timeout: 15000 }).should("be.visible");
        cy.get(CheckoutPage.iyzicoPaymentOption, { timeout: 15000 }).should("be.visible");
        cy.get(CheckoutPage.iyzicoPaymentOption).should("be.visible").and("not.be.disabled");

    });

    it("AC5 - Kartla Ödeme seçildiğinde Ad Soyad, Kart Numarası, Son Kullanma Tarihi ve CVV alanları görüntülenmelidir.", () => {
        cy.addProductsToCart(2);
        cy.get(ShoppingCartPage.cartPriceContainer).find(ShoppingCartPage.checkoutButton).should("be.visible").and("not.be.disabled").click();
        cy.get(CheckoutPage.addressInformationTitle).should("be.visible");
        cy.get(CheckoutPage.paymentStepButton).should("be.visible").click();
        cy.get(CheckoutPage.creditCardPaymentOption).should("be.visible").and("not.be.disabled").click();
        CheckoutPage.creditCardFormInputs.forEach((input) => {
            cy.get(input).should("be.visible");
        });
    });

    it("AC6 - Tüm ödeme alanları doldurulduğunda ödeme butonu aktif hale gelmelidir.", () => {
        cy.addProductsToCart(2);
        cy.get(ShoppingCartPage.cartPriceContainer).find(ShoppingCartPage.checkoutButton).should("be.visible").and("not.be.disabled").click();
        cy.get(CheckoutPage.addressInformationTitle).should("be.visible");
        cy.get(CheckoutPage.paymentStepButton).should("be.visible").click();
        cy.get(CheckoutPage.creditCardPaymentOption).should("be.visible").and("not.be.disabled").click();
        cy.fixture("testData").then((data) => {
            cy.get(CheckoutPage.cardHolderNameInput).type(data.creditCard.cardHolderName);
            cy.get(CheckoutPage.cardNumberInput).type(data.creditCard.cardNumber);
            cy.get(CheckoutPage.cardExpiryDateInput).type(data.creditCard.expiryDate);
            cy.get(CheckoutPage.cardCvvInput).type(data.creditCard.cvv);
            cy.get(CheckoutPage.paymentButton).should("be.visible").and("not.be.disabled");
            cy.get(CheckoutPage.paymentButton).should("have.css", "background-color").and("eq", "rgb(30, 100, 255)")
        });
    });

    it("AC7 - Eksik alanlarla ödeme yapılmaya çalışıldığında gerekli alanların altında kırmızı uyarı mesajları görüntülenmelidir.", () => {
        cy.addProductsToCart(2);
        cy.get(ShoppingCartPage.cartPriceContainer).find(ShoppingCartPage.checkoutButton).should("be.visible").and("not.be.disabled").click();
        cy.get(CheckoutPage.addressInformationTitle).should("be.visible");
        cy.get(CheckoutPage.paymentStepButton).should("be.visible").click();
        cy.get(CheckoutPage.creditCardPaymentOption, { timeout: 10000 }).should("be.visible").and("not.be.disabled").click();
        cy.fixture("testData").then((data) => {
            const cardFields = [
                {
                    locator: CheckoutPage.cardHolderNameInput,
                    value: data.creditCard.cardHolderName
                },
                {
                    locator: CheckoutPage.cardNumberInput,
                    value: data.creditCard.cardNumber
                },
                {
                    locator: CheckoutPage.cardExpiryDateInput,
                    value: data.creditCard.expiryDate
                },
                {
                    locator: CheckoutPage.cardCvvInput,
                    value: data.creditCard.cvv
                }
            ];
            cardFields.forEach((emptyField, emptyIndex) => {
                cardFields.forEach((field) => {
                    cy.get(field.locator).clear();
                });
                cardFields.forEach((field, index) => {
                    if (index !== emptyIndex) {
                        cy.get(field.locator).type(field.value);
                    }
                });
                cy.get(CheckoutPage.paymentButton).should("be.visible").click({ force: true });
                cy.get(CheckoutPage.validationErrorMessage).should("exist").and("be.visible");
            });
        });
    });

    it("AC8 - Ödeme adımındaki Sipariş Özeti alanında doğru Genel Toplam tutarı görüntülenmelidir.", () => {
        cy.addProductsToCart(2);
        cy.get(ShoppingCartPage.cartPriceContainer).find(ShoppingCartPage.checkoutButton).should("be.visible").and("not.be.disabled").click();
        cy.get(CheckoutPage.addressInformationTitle).should("be.visible");
        cy.get(CheckoutPage.paymentStepButton).should("be.visible").click();
        cy.get(CheckoutPage.creditCardPaymentOption).should("be.visible");
        cy.get(CheckoutPage.orderSummary).should("be.visible");
        cy.get(CheckoutPage.orderPriceRows)
            .should("have.length", 3)
            .then(($rows) => {

                const cartTotal = parsePrice(
                    $rows.eq(0).find("div").last().text()
                );

                const shippingFee = parsePrice(
                    $rows.eq(1).find("div").last().text()
                );

                const generalTotal = parsePrice(
                    $rows.eq(2).find("div").last().text()
                );

                expect(generalTotal).to.be.closeTo(cartTotal + shippingFee, 0.01);
            });
    });

});
import SearchPage from "../pages/SearchPage";
import ProductPage from "../pages/ProductPage";
import HomePage from "../pages/HomePage";

describe("User Story - 03 - Ürün Detay Sayfası Görüntüleme ve Sepete Ekleme", () => {

    beforeEach(() => {
        cy.visit("/");
        cy.acceptCookiesIfVisible();
        cy.closePromotionIfVisible();
    });

    it("AC1 / 1 - Kullanıcı ürün görseline tıkladığında ürün detay sayfasına yönlendirilmelidir.", () => {
        cy.get(SearchPage.productImage).first().should("be.visible").closest("a").invoke("attr", "href").then((productUrl) => {
            cy.get(SearchPage.productImage).first().click();
            cy.url().should("include", productUrl);
        });
    });

    it("AC1 / 2 - Kullanıcı ürün ismine tıkladığında ürün detay sayfasına yönlendirilmelidir.", () => {
        cy.get(SearchPage.productName).first().should("be.visible").invoke("attr", "href").then((productUrl) => {
            cy.get(SearchPage.productName).first().click();
            cy.url().should("include", productUrl);
        });
    });
    it("AC2 - Ürün detay sayfasında ürün adı, yazar, yayınevi ve fiyat bilgileri görüntülenmelidir.", () => {
        cy.get(SearchPage.productName).first().click();
        ProductPage.productInformations.forEach((element) => {
            cy.get(element).should("be.visible").and("not.be.empty");
        });
    });

    it("AC3 - Ürün Hakkında Bilgiler bölümünde ürün detay bilgileri görüntülenmelidir.", () => {
        cy.get(SearchPage.productName).eq(1).click();
        cy.get(ProductPage.productInformationSection).should("be.visible").within(() => {
                ProductPage.productDetailLabels.forEach((label) => {
                    cy.contains(label).should("be.visible");
                });
            });
    });

    it('AC4 - Ürün detay sayfasında fiyat bilgisinin altında işlevsel bir "Sepete Ekle" butonu bulunmalıdır.', () => {
        cy.get(SearchPage.productName).eq(1).click();
        cy.get(ProductPage.addToCartButton).should("be.visible").and("not.be.disabled");
    });

    it('AC5 - Sepete Ekle butonuna tıklandığında "Ürün başarıyla sepete eklendi" onay mesajı görüntülenmelidir.', () => {
        cy.get(SearchPage.productName).eq(1).click();
        cy.get(ProductPage.addToCartButton).should("be.visible").click()
        cy.get(ProductPage.addToCartSuccessMessage).should("be.visible").and("contain.text", "Ürün Başarıyla Sepete Eklendi");
        cy.get(ProductPage.goToCartPopupButton).should("be.visible");
        cy.get(ProductPage.buyNowPopupButton).should("be.visible");


    });

    it("AC6 - Ürün sepete eklendikten sonra sağ üstteki sepet ikonundaki ürün sayısı 1 artmalıdır.", () => {

        cy.get(HomePage.cartItemCount).invoke("text").then((countText) => {
            const initialCount = Number(countText.trim());
            cy.get(SearchPage.productName).eq(1).click();
            cy.get(ProductPage.addToCartButton).should("be.visible").click();
            cy.get(HomePage.cartItemCount).should(($count) => {
                const newCount = Number($count.text().trim());
                expect(newCount).to.eq(initialCount + 1);
            });
        });
    });
});
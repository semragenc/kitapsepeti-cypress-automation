import ShoppingCartPage from "../pages/ShoppingCartPage";
import ProductPage from "../pages/ProductPage";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";

function parsePrice(priceText) {
    return Number(
        priceText
            .replace("TL", "")
            .replace(/\./g, "")
            .replace(",", ".")
            .trim()
    );
}

describe("User Story - 04 - Sepet Yönetimi ve Kontrolü", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.acceptCookiesIfVisible();
        cy.closePromotionIfVisible();
    });

    it("AC1/1 - Sepet ikonundan Sepetim alanı açılmalı ve Sepete Git ile sepet sayfasına erişilebilmelidir.", () => {
        cy.get(ShoppingCartPage.cartIcon).should("be.visible").click();
        cy.get(ShoppingCartPage.cartNavigation).should("be.visible");
        cy.get(ShoppingCartPage.goToCartButton).should("be.visible").click();
        cy.url().should("include", "/sepet");

    });

    it("AC1/2 - Sepetteki ürün fiyatları toplamı ile Sepet Toplamı tutarlı olmalıdır.", () => {
        cy.addProductsToCart(2);
        cy.url().should("include", "/sepet");
        let productsTotal = 0;
        cy.get(ShoppingCartPage.cartItems).find("strong").filter((index, element) => {
            return element.innerText.trim() === "Toplam";
        }).next(".price-sell").each(($price) => {
            const price = parsePrice($price.text());
            productsTotal += price;
        })
            .then(() => {
                cy.get(ShoppingCartPage.cartPriceContainer).contains("Sepet Toplamı").parent().find(".text-right").invoke("text")
                    .then((cartTotalText) => {
                        const cartTotal = parsePrice(cartTotalText);
                        expect(productsTotal).to.eq(cartTotal);
                    });
            });
    });

    it("AC2 - Sepette ürün adı, birim fiyat, adet ve toplam tutar bilgileri doğru olarak gösterilmelidir.", () => {
        let expectedProductName;
        let expectedUnitPrice;
        cy.get(SearchPage.productCards).first().then(($card) => {
            expectedProductName = $card.find(SearchPage.productName).text().trim();
            expectedUnitPrice = parsePrice(
                $card.find(SearchPage.productPrice).text()
            );
            cy.addProductsToCart(1);
            cy.get(ShoppingCartPage.cartItems).contains(expectedProductName).closest(ShoppingCartPage.cartItems)
                .then(($item) => {
                    cy.wrap($item).find(ShoppingCartPage.productName).invoke("text")
                        .then((cartProductName) => {
                            expect(cartProductName.trim()).to.eq(expectedProductName);
                        });
                    cy.wrap($item).find(ShoppingCartPage.priceValue).should("have.length", 2)
                        .then(($prices) => {
                            const unitPrice = parsePrice(
                                $prices.eq(0).text()
                            );
                            const totalPrice = parsePrice(
                                $prices.eq(1).text()
                            );
                            expect(unitPrice).to.eq(expectedUnitPrice);
                            cy.wrap($item).find(ShoppingCartPage.productQuantity).invoke("val")
                                .then((quantityValue) => {
                                    const quantity = Number(quantityValue);
                                    expect(quantity).to.be.at.least(1);
                                    expect(totalPrice)
                                        .to.eq(unitPrice * quantity);
                                });
                        });
                });
        });
    });

    it("AC3 - Sepet Toplamı bölümünde Sepet Toplamı, Kargo Ücreti ve Genel Toplam doğru hesaplanmalıdır.", () => {
        cy.addProductsToCart(2);
        cy.get(ShoppingCartPage.cartPriceContainer).find(ShoppingCartPage.cartPriceRows).should("have.length", 3).then(($rows) => {
            const cartSubtotal = parsePrice($rows.eq(0).find(".text-right").text()
            );
            const shippingFee = parsePrice($rows.eq(1).find(".text-right").text()
            );
            const grandTotal = parsePrice($rows.eq(2).find(".text-right").text()
            );
            cy.log(`Sepet Toplamı: ${cartSubtotal}`);
            cy.log(`Kargo Ücreti: ${shippingFee}`);
            cy.log(`Genel Toplam: ${grandTotal}`);
            expect(cartSubtotal + shippingFee).to.eq(grandTotal);
        });
    });

    it("AC4 - Artı butonuna basıldığında ürün adedi 1 artmalı ve tutarlar güncellenmelidir.", () => {
        cy.addProductsToCart(1);
        cy.get(ShoppingCartPage.cartItems).first().then(($item) => {
            cy.wrap($item).find(ShoppingCartPage.productQuantity).invoke("val").then((quantityValue) => {
                const initialQuantity = Number(quantityValue);
                cy.wrap($item).contains("strong", "Fiyat").parent().find(".price-sell").invoke("text")
                    .then((unitPriceText) => {
                        const unitPrice = parsePrice(unitPriceText);
                        cy.get(ShoppingCartPage.cartPriceContainer).find(ShoppingCartPage.cartPriceRows).eq(0).find(".text-right").invoke("text")
                            .then((subtotalText) => {
                                const initialSubtotal = parsePrice(subtotalText);
                                cy.wrap($item).find(ShoppingCartPage.increaseQuantityButton).click();
                                cy.get(ShoppingCartPage.cartItems).first().find(ShoppingCartPage.productQuantity).should(
                                    "have.value",
                                    String(initialQuantity + 1)
                                );
                                cy.get(ShoppingCartPage.cartPriceContainer).find(ShoppingCartPage.cartPriceRows).eq(0).find(".text-right").should(($subtotal) => {
                                    const newSubtotal = parsePrice($subtotal.text());
                                    expect(newSubtotal).to.eq(initialSubtotal + unitPrice);
                                });
                            });
                    });
            });
        });
    });

    it("AC5 - Silme ikonuyla ürün sepetten kaldırılabilmelidir.", () => {
        cy.addProductsToCart(1);
        cy.get(ShoppingCartPage.cartItems).its("length").then((initialProductCount) => {
            cy.get(ShoppingCartPage.cartItems).first().find(ShoppingCartPage.deleteProductButton).click();
            cy.get(ShoppingCartPage.deleteConfirmPopup).should("be.visible");
            cy.get(ShoppingCartPage.deleteConfirmButtons).first().click();
            cy.get(ShoppingCartPage.cartItems).should("have.length", initialProductCount - 1);
        });
    });

    it("AC6 - Sepeti Temizle ile tüm ürünler sepetten kaldırılabilmelidir.", () => {
        cy.addProductsToCart(2);
        cy.get(ShoppingCartPage.cartItems).should("have.length.at.least", 2);
        cy.get(ShoppingCartPage.clearCartButton).should("be.visible").click();
        cy.get(HomePage.cartItemCount).should(($count) => {
            const cartCount = Number($count.text().trim());
            expect(cartCount).to.eq(0);
        });
    });

    it("AC7 - Boş sepette bilgilendirme mesajı ve Alışverişe Devam Et butonu görüntülenmelidir.", () => {
        cy.addProductsToCart(1);
        cy.get(ShoppingCartPage.clearCartButton).should("be.visible").click();
        cy.get(HomePage.cartItemCount).should(($count) => {
                const cartCount = Number($count.text().trim());
                expect(cartCount).to.eq(0);
            });
        cy.contains( "p", "Sepetinizde Ürün Bulunmamaktadır",{ timeout: 10000 }).should("be.visible");
        cy.get(ShoppingCartPage.continueShoppingButton, { timeout: 10000 }).should("be.visible");
    });

    it("AC8 - Sepette ürün varken Satın Al butonu görüntülenmeli ve tıklanabilir olmalıdır.", () => {
        cy.addProductsToCart(1);
        cy.get(ShoppingCartPage.checkoutButton).should("be.visible").and("not.be.disabled").click();
    });

    it("AC9 - Ürün detay sayfasındaki Sepete Ekle popupından Sepete Git ile sepete gidilebilmelidir.", () => {
        cy.get(SearchPage.productName).eq(1).should("be.visible").click();
        cy.get(ProductPage.addToCartButton).should("be.visible").click();
        cy.get(ProductPage.addToCartSuccessMessage).should("be.visible");
        cy.get(ProductPage.goToCartPopupButton).should("be.visible").click();
        cy.url().should("include", "/sepet");
    });

    it("AC10 - Ana sayfadaki Sepete Ekle popupından Sepete Git ile sepete gidilebilmelidir.", () => {
        cy.get(SearchPage.productCards).eq(1).scrollIntoView().then(($card) => {
            cy.wrap($card).find(SearchPage.addToCartButton).click({ force: true });
        });
        cy.get(ProductPage.addToCartSuccessMessage).should("be.visible");
        cy.get(ProductPage.goToCartPopupButton).should("be.visible").click();
        cy.url().should("include", "/sepet");
    });

});
Cypress.Commands.add("visitHomePage", () => {
    cy.visit("/");
});

Cypress.Commands.add("acceptCookiesIfVisible", () => {
    cy.get("body").then(($body) => {
        const visibleButton = $body
            .find("button.cc-nb-okagree:visible");

        if (visibleButton.length > 0) {
            cy.get("button.cc-nb-okagree:visible")
                .first()
                .click();
        }
    });
});

Cypress.Commands.add("closePromotionIfVisible", () => {
    cy.get("body").then(($body) => {
        if ($body.find("#t-modal-close-1").length > 0) {
            cy.get("#t-modal-close-1").click();
        }
    });
});

Cypress.Commands.add("loginWithSession", (email, password) => {
    cy.session(
        [email, password],
        () => {
            cy.visit("/");
            cy.acceptCookiesIfVisible();
            cy.closePromotionIfVisible();

            cy.get(".member-login-btn").click();
            cy.get("#header-email").clear().type(email);
            cy.get("#header-password").clear().type(password, { log: false });

            cy.get("body").then(($body) => {
                const captchaVisible =
                    $body.find('[name="security_code"]:visible').length > 0;

                if (captchaVisible) {
                    cy.log("CAPTCHA göründü. Güvenlik kodunu manuel olarak gir.");

                    cy.get('[name="security_code"]', { timeout: 120000 })
                        .should("not.have.value", "");
                }
            });

            cy.get('[id^="login-btn-"]').click();
        },
        {
            cacheAcrossSpecs: true,
        }
    );
});

Cypress.Commands.add("searchProduct", (searchText) => {
    cy.get("#live-search")
        .clear()
        .type(searchText);

    cy.get("#live-search-btn")
        .click();
});
Cypress.Commands.add("addProductsToCart", (productCount = 1) => {

    const productCards = ".product-item";
    const addToCartButton = '[id^="product-addcart-button-"]';
    const cartItemCount = ".cart-soft-count";
    const successMessage = ".t-modal-content .product-cart-title";
    const popupCloseButton = ".t-modal-container .t-modal-close";
    const goToCartPopupButton = "#cart-popup-go-cart";

    function addProduct(productIndex, addedCount) {

        // İstenen sayıda ürün başarıyla eklendiyse bitir
        if (addedCount >= productCount) {
            return;
        }

        cy.get(productCards)
            .its("length")
            .then((productLength) => {

                // Denenecek başka ürün kalmadıysa testi fail et
                if (productIndex >= productLength) {
                    throw new Error(
                        `${productCount} adet ürün sepete eklenemedi. Uygun ürün kalmadı.`
                    );
                }

                // Tıklamadan önce mevcut sepet sayısını al
                cy.get(cartItemCount)
                    .invoke("text")
                    .then((countText) => {

                        const initialCartCount =
                            Number(countText.trim());

                        // İlgili ürünü tekrar DOM'dan bul
                        cy.get(productCards)
                            .eq(productIndex)
                            .scrollIntoView()
                            .find(addToCartButton)
                            .click({ force: true });

                        // Sepet işleminin tamamlanması için
                        // cart count'un durumunu kontrol et
                        cy.wait(500);

                        cy.get(cartItemCount)
                            .invoke("text")
                            .then((newCountText) => {

                                const newCartCount =
                                    Number(newCountText.trim());

                                // Sepet sayısı artmadıysa
                                // bu ürünü atla ve sonraki karta geç
                                if (newCartCount <= initialCartCount) {

                                    cy.log(
                                        `Ürün ${productIndex + 1} sepete eklenemedi, sonraki ürün deneniyor.`
                                    );

                                    // Başarısız eklemede bir popup açılmışsa kapat
                                    cy.get("body").then(($body) => {

                                        if (
                                            $body.find(popupCloseButton).length > 0
                                        ) {
                                            cy.get(popupCloseButton)
                                                .filter(":visible")
                                                .click();
                                        }
                                    });

                                    addProduct(
                                        productIndex + 1,
                                        addedCount
                                    );

                                    return;
                                }

                                // Ürün başarıyla eklendi
                                cy.get(successMessage)
                                    .should("be.visible");

                                const newAddedCount =
                                    addedCount + 1;

                                // İstenen ürün sayısına ulaştık
                                if (newAddedCount >= productCount) {

                                    cy.get(goToCartPopupButton)
                                        .should("be.visible")
                                        .click();

                                    cy.url()
                                        .should("include", "/sepet");

                                    return;
                                }

                                // Daha fazla ürün ekleyeceğiz
                                // popup'ı kapat
                                cy.get(popupCloseButton)
                                    .filter(":visible")
                                    .click();

                                cy.get(successMessage)
                                    .should("not.exist");

                                // Sonraki karta geç
                                addProduct(
                                    productIndex + 1,
                                    newAddedCount
                                );
                            });
                    });
            });
    }

    addProduct(0, 0);
});
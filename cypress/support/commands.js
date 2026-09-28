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
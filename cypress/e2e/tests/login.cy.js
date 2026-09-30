import LoginPage from "../pages/LoginPage";

describe("User Story - 01 - Kullanıcı Girişi", () => {

    beforeEach(() => {
        cy.visitHomePage();
        cy.acceptCookiesIfVisible();
        cy.closePromotionIfVisible();
    });
    it("AC1 /1 - E-posta ile Giriş linkine tıklandığında giriş popup'ı açılmalıdır", () => {
        LoginPage.clickLoginEmailButton();

        cy.get(LoginPage.emailInput).should("be.visible");
        cy.get(LoginPage.passwordInput).should("be.visible");
    });

    it("AC1 / 2 - Avatar ikonuna tıklandığında giriş popup'ı açılmalıdır", () => {
        LoginPage.clickLoginAvatarButton();

        cy.get(LoginPage.emailInput).should("be.visible");
        cy.get(LoginPage.passwordInput).should("be.visible");
    });

    it("AC2 - Giriş formundaki gerekli alanlar görünür olmalıdır", () => {
        LoginPage.clickLoginEmailButton();
        cy.get(LoginPage.emailInput).should("be.visible");
        cy.get(LoginPage.passwordInput).should("be.visible");
        cy.get(LoginPage.forgotPasswordButton).should("be.visible");

        cy.get("#header-remember").should("exist");
        cy.contains("Beni Hatırla").should("be.visible");
        cy.get(LoginPage.loginButton).should("be.visible");
        cy.get(LoginPage.registerButtonPopup).should("be.visible");
    });

    it("AC3 - Geçerli bilgilerle başarılı giriş olmalıdır.", () => {
        LoginPage.clickLoginEmailButton();
        cy.fixture("testData").then((data) => {
            LoginPage.login(data.email, data.password);
            cy.get(LoginPage.accountButton).should("be.visible").and("have.attr", "aria-label", "Hesabım");
        });
    });

    it("AC4 - Başarılı giriş sonrası hesap sayfasına erişilebildiği doğrulanmalıdır.", () => {
        cy.fixture("testData").then((data) => {

            cy.loginWithSession(data.email, data.password);

            cy.visit("/");

            cy.get(LoginPage.accountButton).click();

            cy.get(LoginPage.messagesButton).should("be.visible");
        });
    });

    it("AC5 /2 - Yanlış e-posta ve doğru şifre ile hata mesajı gösterilmelidir", () => {
        LoginPage.clickLoginEmailButton();
        cy.fixture("testData").then((data) => {
            LoginPage.login("wrongmail@test.com", data.password);
            LoginPage.verifyLoginErrorMessage();
        });
    });

    it("AC6 - Geçersiz e-posta formatlarında hata mesajı gösterilmelidir", () => {
        LoginPage.clickLoginEmailButton();
        cy.fixture("testData").then((data) => {
            data.invalidEmails.forEach((invalidEmail) => {
                cy.get(LoginPage.emailInput).clear().type(invalidEmail);
                cy.get(LoginPage.passwordInput).clear().type(data.password);
                cy.get(LoginPage.loginButton).click();
                LoginPage.verifyLoginErrorMessage();
            });
        });
    });

    it("AC7 /1 - E-posta ve şifre boşken giriş yapılamamalıdır", () => {
        LoginPage.clickLoginEmailButton();
        LoginPage.login("", "");
        cy.get(LoginPage.logoutButton).should("not.exist");
    });

    it("AC7 /2 - Geçerli e-posta ve boş şifre ile giriş yapılamamalıdır", () => {
        LoginPage.clickLoginEmailButton();
        cy.fixture("testData").then((data) => {
            LoginPage.login(data.email, "");
            cy.get(LoginPage.logoutButton).should("not.exist");
        });
    });

    it("AC7 /3 - Geçerli password ve boş email ile giriş yapılamamalıdır", () => {
        LoginPage.clickLoginEmailButton();
        cy.fixture("testData").then((data) => {
            LoginPage.login("", data.password);
            cy.get(LoginPage.logoutButton).should("not.exist");
        });
    });

    it("AC8 - Kayıt ol butonuna tıklandığında kayıt sayfası açılmalıdır", () => {
        cy.get(LoginPage.registerButton).click();
        cy.contains("Doğum Tarihi").should("be.visible");
    });

    it("AC9 - Şifremi Unuttum butonuna tıklandığında gerekli sayfaya yönlendirmelidir.", () => {
        LoginPage.clickLoginEmailButton();
        cy.get(LoginPage.forgotPasswordButton).should("be.visible").click();
        cy.url().should("include", "/uye-sifre-hatirlat");
        cy.get(LoginPage.forgotPasswordEmailInput).should("be.visible");
        cy.get(LoginPage.remindPasswordButton).should("be.visible");
    });

});
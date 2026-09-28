class LoginPage {

    emailLoginButton = ".member-login-btn";
    avatarButton = "#header-account";
    emailInput = "#header-email";
    passwordInput = "#header-password";
    forgotPasswordButton = 'a[href="/uye-sifre-hatirlat"]';
    rememberMeCheckbox = "#header-remember";
    registerButtonPopup = '[id^="register-btn-"]';
    loginButton = '[id^="login-btn-"]';
    accountButton = "#header-account";
    loginErrorMessage = ".popover-item";
    forgotPasswordEmailInput = "#email-292";
    remindPasswordButton = "#forgot-password-btn-292";
    logoutButton = '[id^="member-logout-btn-"]';
    registerButton = '.member-register-btn a[href="/uye-kayit"]';
    userAvatar = ".member-quick-menu-avatar";
    messagesButton = 'a[href="/mesaj"]';

    clickLoginEmailButton() {
        cy.get(this.emailLoginButton).click();
    }

    clickLoginAvatarButton() {
        cy.get(this.avatarButton).click();
    }
    login(email, password) {
        if (email) { cy.get(this.emailInput).type(email); }
        if (password) { cy.get(this.passwordInput).type(password); }
        cy.get(this.loginButton).click();
    }
    verifyLoginErrorMessage() {
        cy.get(this.loginErrorMessage).should("be.visible").invoke("text").then((message) => {
            expect(message.trim()).to.be.oneOf([
                "Giriş bilgileriniz hatalı.",
                "Güvenlik kodunu doldurunuz."
            ]);
        });
    }
}

export default new LoginPage();

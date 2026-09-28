import SearchPage from "../pages/SearchPage";

describe("User Story - 02 - Ürün Arama ve Listeleme", () => {
    beforeEach(() => {
        cy.visitHomePage();
        cy.acceptCookiesIfVisible();
        cy.closePromotionIfVisible();
    });

    it("AC1 / 1 - Kullanıcı arama çubuğuna en az 1 karakter yazarak Enter ile arama yapabilmelidir.", () => {
        cy.fixture("testData").then((data) => {
            cy.get(SearchPage.searchInput).clear().type(`${data.searchData.singleCharacterSearch}{enter}`);
            cy.url().should("include", "/arama");
        });
    });

    it("AC1 / 2 - Kullanıcı arama çubuğuna ürün adı yazarak arama butonu ile arama yapabilmelidir.", () => {
        cy.fixture("testData").then((data) => {
            cy.searchProduct(data.searchData.singleCharacterSearch);
            cy.url().should("include", "/arama");
        });
    });

    it("AC2 - Arama sonrası uygun ürünler listelenmeli ve arama kutusu temizlenmelidir.", () => {
        cy.fixture("testData").then((data) => {
            cy.searchProduct(data.searchData.authorSearch);
            cy.url().should("include", "/arama");
            cy.get(SearchPage.productCards).should("have.length.greaterThan", 0);
            cy.get(SearchPage.productList).find(SearchPage.productCards).then(($cards) => {
                const firstFiveCards = $cards.slice(0, 5);
                cy.wrap(firstFiveCards).each(($card) => {
                    cy.wrap($card).invoke("text").should("match", new RegExp(data.searchData.authorSearch, "i"));
                });
            });
            cy.get(SearchPage.searchInput).should("have.value", "");
        });
    });

    it("AC3 - Sistemde bulunmayan bir kelime aratıldığında uygun ürün bulunmamalıdır.", () => {
        cy.fixture("testData").then((data) => {
            cy.searchProduct(data.searchData.nonExistingSearch);
            cy.url().should("include", "/arama");
            cy.get(SearchPage.productList).find(SearchPage.productCards).should("not.exist");
        });
    });

    it("AC4 - Ürün kartlarında görsel, ürün adı, yayınevi ve fiyat bilgileri görüntülenmelidir.", () => {
        cy.fixture("testData").then((data) => {
            cy.searchProduct(data.searchData.authorSearch);
            cy.url().should("include", "/arama");
            cy.get(SearchPage.productList).find(SearchPage.productCards).each(($card) => {
                cy.wrap($card).find(SearchPage.productImage).should("be.visible").and("have.attr", "src");
                cy.wrap($card).find(SearchPage.productName).should("be.visible").and("not.be.empty");
                cy.wrap($card).find(SearchPage.publisherName).should("be.visible").and("not.be.empty");
                cy.wrap($card).find(SearchPage.authorName).should("be.visible").and("not.be.empty");
                cy.wrap($card).find(SearchPage.productPrice).should("be.visible").and("not.be.empty");
            });
        });
    });

    it("AC5 - Ürün kartında Sepete Ekle butonu bulunmalı ve fiyat üzerine hover yapıldığında aktif hale gelmelidir.", () => {
        cy.fixture("testData").then((data) => {
            cy.searchProduct(data.searchData.authorSearch);
            cy.url().should("include", "/arama");
            cy.get(SearchPage.productList).find(SearchPage.productCards).then(($cards) => {
                const firstThreeCards = $cards.slice(0, 3);
                cy.wrap(firstThreeCards).each(($card) => {
                    cy.wrap($card).find(SearchPage.productPrice).should("be.visible");
                    cy.wrap($card).realHover();
                    cy.wrap($card).find(SearchPage.addToCartButton).should("be.visible");
                });
            });
        });
    });


    it("AC6 - Sıralama menüsünde gerekli sıralama seçenekleri listelenmelidir.", () => {
        cy.fixture("testData").then((data) => {
            cy.searchProduct(data.searchData.authorSearch);
            cy.url().should("include", "/arama");
            cy.get(SearchPage.sortButton).find("option").should("have.length", data.sortOptions.length);
            data.sortOptions.forEach((option) => {
                cy.get(SearchPage.sortButton).find("option").should("contain.text", option);
            });
        });
    });


    it("AC7 / 1 - Kategoriler filtresi bulunur ve uygulanabilmelidir.", () => {
        cy.fixture("testData").then((data) => {
            cy.searchProduct(data.searchData.authorSearch);
            cy.url().should("include", "/arama");
            cy.get(SearchPage.categoryFilter).should("be.visible");
            cy.get(SearchPage.categoryOptions, { timeout: 10000 }).should("be.visible").first().click();
            cy.url().should("include", "category=");
        });
    });

    it("AC7 / 2 - Marka filtresi bulunur ve uygulanabilmelidir.", () => {
        cy.fixture("testData").then((data) => {
            cy.searchProduct(data.searchData.authorSearch);
            cy.url().should("include", "/arama");
            cy.get(SearchPage.brandFilter).should("be.visible");
            cy.wait(4000);
            cy.get(SearchPage.brandOptions, { timeout: 10000 }).should("be.visible").first().click();
            cy.contains("button", "Seçimi Filtrele").should("be.visible").click();
            cy.url().should("include", "brand=");
        });
    });

    it("AC7 / 3 - Model filtresi bulunur ve uygulanabilmelidir.", () => {
        cy.fixture("testData").then((data) => {
            cy.searchProduct(data.searchData.authorSearch);
            cy.url().should("include", "/arama");
            cy.get(SearchPage.modelFilter).should("be.visible");
            cy.get(SearchPage.modelOptions, { timeout: 10000 }).should("be.visible").first().click();
            cy.contains("button", "Seçimi Filtrele").should("be.visible").click();
            cy.url().should("include", "model=");
        });
    });

    it("AC8 - Kullanıcı hazır kategorilere tıklayarak ilgili kategori ürünlerini görüntüleyebilmelidir.", () => {
        cy.fixture("testData").then((data) => {
            cy.wrap(data.mainCategories).each((category) => {
                cy.get(SearchPage.mainMenuCategories).contains(category.menu).click();
                cy.url().should("not.eq", Cypress.config("baseUrl") + "/");
                cy.get(SearchPage.categoryTitle, { timeout: 10000 }).should("be.visible").and("contain.text", category.expectedTitle);
            });
        });
    });

    it("AC9 - Kullanıcı aşağı scroll yaptığında yeni sayfanın yüklendiği doğrulanmalıdır.", () => {
        cy.fixture("testData").then((data) => {
            cy.visit(`/arama?q=${data.searchData.authorSearch}`);
            cy.intercept("GET", "**/product-loader/**").as("loadMoreProducts");
            cy.scrollTo("bottom");
            cy.wait("@loadMoreProducts").then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.request.url).to.include("pg=2");
            });
        });
    });

});
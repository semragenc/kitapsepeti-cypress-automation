# 📚 Kitapsepeti.com – Cypress E2E Test Automation

![Cypress](https://img.shields.io/badge/Cypress-E2E-69D3A7?logo=cypress)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![POM](https://img.shields.io/badge/Architecture-POM-blue)
![Tests](https://img.shields.io/badge/Automated_Tests-50-success)
![Mochawesome](https://img.shields.io/badge/Reporting-Mochawesome-orange)

> 🧪 **Kitapsepeti.com** üzerindeki kritik e-ticaret kullanıcı akışlarını  
> JavaScript ve Cypress kullanarak uçtan uca (E2E) doğrulayan QA otomasyon projesi.

## 🎯 Proje Amacı

Projenin amacı yalnızca test senaryolarını otomatikleştirmek değil; tekrar kullanılabilir, bakımı kolay ve test sonuçları izlenebilir bir otomasyon yapısı oluşturmaktır.

Otomasyon kapsamı; kullanıcının sisteme giriş yapmasından ürün aramasına, ürün detaylarını incelemesine, sepete ürün eklemesine ve ödeme ekranındaki temel kontrollerin doğrulanmasına kadar uzanan kritik alışveriş akışlarını kapsar.

> ⚠️ **Önemli:** Proje kapsamında gerçek sipariş veya ödeme oluşturulmaz. Ödeme testleri ekran, form, validasyon ve sipariş özeti kontrolleriyle sınırlandırılmıştır.

## 🧪 Test Kapsamı
Proje 5 kullanıcı hikâyesi kapsamında toplam 50 otomasyon testi içermektedir.
| Kullanıcı Hikâyesi | Test Sayısı |
|---|---:|
| US01 – Kullanıcı Girişi | 12 |
| US02 – Ürün Arama ve Listeleme | 12 |
| US03 – Ürün Detayları ve Sepete Ekleme | 7 |
| US04 – Sepet Yönetimi | 11 |
| US05 – Ödeme Ekranı ve Form Doğrulamaları | 8 |
| **Toplam** | **50** |


Testlerde başlıca aşağıdaki kullanıcı davranışları doğrulanmaktadır:
- Geçerli ve geçersiz kullanıcı bilgileriyle giriş işlemleri
- Login sonrası kullanıcı oturumunun doğrulanması
- Ürün arama ve arama sonuçlarının kontrolü
- Kategori, marka ve model gibi filtrelerin doğrulanması
- Ürün kartlarındaki temel bilgilerin kontrolü
- Ürün detay bilgilerinin doğrulanması
- Ürünlerin sepete eklenmesi
- Sepet içerisindeki ürün ve fiyat bilgilerinin kontrolü
- Checkout adımlarının görüntülenmesi
- Kargo ve ödeme seçeneklerinin doğrulanması
- Kredi kartı alanlarının ve form validasyonlarının kontrolü
- Sipariş özeti ve toplam fiyat hesaplamalarının doğrulanması

## 🛠️ Teknolojiler
Projede aşağıdaki teknoloji ve yaklaşımlar kullanılmıştır:
- JavaScript
- Cypress
- Node.js
- npm
- Page Object Model (POM)
- Cypress Fixtures
- Cypress Custom Commands
- Cypress Fixtures & Data-Driven Test Data Management
- cy.session()
- cy.intercept()
- cypress-real-events
- Mochawesome
- Git
- GitHub

## 🏗️ Proje Mimarisi
Proje, test kodunun okunabilirliğini ve bakımını kolaylaştırmak amacıyla Page Object Model (POM) yaklaşımıyla yapılandırılmıştır.
Temel sorumluluk ayrımı şu şekildedir:
```text
Test Scenario
      ↓
Page Object
      ↓
Reusable Commands
      ↓
Application
```

Projede genel olarak:
- Page Object: Elementlerin nerede bulunduğunu ve tekrar kullanılabilir sayfa davranışlarını,
- Test dosyaları: Kullanıcı davranışını ve Acceptance Criteria doğrulamalarını,
- Fixtures: Test verilerini,
- Custom Commands: Birden fazla testte kullanılan ortak akışları,
- Support dosyaları: Global Cypress davranışlarını,
- Config: Cypress çalışma ayarlarını
yönetmektedir.
Bu ayrım sayesinde locator veya sayfa yapısında meydana gelebilecek değişikliklerin test senaryolarından mümkün olduğunca ayrılması ve tekrar eden kodların azaltılması hedeflenmiştir.

## 🗂️ Proje Yapısı

```text
cypress/
├── e2e/
│   ├── pages/
│   │   ├── CheckoutPage.js
│   │   ├── HomePage.js
│   │   ├── LoginPage.js
│   │   ├── ProductPage.js
│   │   ├── SearchPage.js
│   │   └── ShoppingCartPage.js
│   │
│   └── tests/
│       ├── checkout.cy.js
│       ├── login.cy.js
│       ├── product.cy.js
│       ├── search.cy.js
│       └── shoppingCart.cy.js
│
├── fixtures/
│   ├── example.json
│   └── testData.json
│
├── support/
│   ├── commands.js
│   └── e2e.js
│
├── reports/
├── screenshots/
└── videos/
```
pages/
Sayfalara ait locator'lar ve tekrar kullanılabilir sayfa işlemleri burada tutulur.
tests/
User Story ve Acceptance Criteria bazlı E2E test senaryolarını içerir. Testin gerçekten beklenen kullanıcı davranışını doğrulayan assertion'ları ağırlıklı olarak bu katmanda tutulur.
fixtures/
Login bilgileri ve arama verileri gibi test verilerinin test kodundan ayrılmasını sağlar.
commands.js
Birden fazla test içerisinde tekrar kullanılan;
- login,
- ürün arama,
- sepete ürün ekleme
gibi ortak kullanıcı akışlarını içerir.
e2e.js
Global Cypress ayarları ve test çalışmasını etkileyen ortak davranışları içerir.

## 🧠 Test Tasarım Yaklaşımı
Testler yalnızca bir elementin DOM içerisinde bulunmasını değil, ilgili Acceptance Criteria'nın gerçekten gerçekleştiğini doğrulayacak şekilde tasarlanmıştır.
Projede hem pozitif hem de negatif test senaryoları bulunmaktadır.
Örneğin login akışında yalnızca formun submit edilmesi başarılı giriş olarak kabul edilmez. Başarılı login sonrasında authenticated kullanıcı durumunun oluştuğu ayrıca doğrulanır.
Benzer şekilde ürün detay senaryosunda beklenen bilgi alanının bulunmaması durumunda testin yalnızca log üretip başarılı sonuçlanması yerine ilgili Acceptance Criteria'nın başarısız olması sağlanmıştır.
Bu yaklaşım testlerde false-positive sonuçların azaltılmasını amaçlamaktadır.

## 📊 Test Verisi Yönetimi & Data-Driven Approach

Test verilerinin test kodundan ayrılması amacıyla Cypress Fixture yapısı kullanılmıştır. Kullanıcı bilgileri ve arama verileri gibi değişken test dataları `cypress/fixtures/testData.json` dosyasında merkezi olarak tutulmaktadır.

Test senaryoları ihtiyaç duydukları verileri `cy.fixture()` üzerinden alarak kullanır. Böylece test datası ile test mantığı birbirinden ayrılmış, aynı verilerin farklı senaryolarda tekrar kullanılabilmesi ve merkezi olarak güncellenebilmesi sağlanmıştır.

Örneğin kullanıcı giriş bilgilerinin test içerisinde doğrudan yazılması yerine fixture üzerinden alınması:

```javascript
cy.fixture("testData").then((data) => {
    LoginPage.login(data.email, data.password);
});
```

Bu yapı projede fixture tabanlı bir data-driven test yaklaşımı uygulanmasını sağlamaktadır. Bunun yanında canlı bir e-ticaret sitesi test edildiği için ürün adı, ürün fiyatı ve sepet toplamı gibi bazı değerler önceden sabitlenmek yerine çalışma zamanında uygulamadan dinamik olarak okunmakta ve sonraki adımlardaki değerlerle karşılaştırılmaktadır.

## 🎯 Locator Stratejisi
Mümkün olduğunca kararlı ve anlamlı selector'lar kullanılmaya çalışılmıştır.
Ancak canlı uygulamada bazı element ID'leri dinamik olarak üretildiği için tam ID yerine prefix selector kullanılması gereken durumlar bulunmaktadır.
Örneğin:
[id^="product-addcart-button-"]

Bu selector, ID değeri product-addcart-button- ile başlayan elementi seçmektedir.
Bu sayede dinamik olarak değişen ID'nin tamamına bağımlılık azaltılmıştır.

## ♻️ Custom Commands
Tekrar eden kullanıcı akışlarının farklı test dosyalarında yeniden yazılmasını engellemek amacıyla Cypress Custom Commands kullanılmıştır.
Projede ortaklaştırılan temel işlemler arasında:
- Ana sayfaya gitme
- Cookie bildiriminin yönetilmesi
- Promotion popup kontrolü
- Kullanıcı oturumu oluşturma
- Ürün arama
- Bir veya birden fazla ürünü sepete ekleme
bulunmaktadır.
Bu yapı test senaryolarının teknik detaylardan ziyade kullanıcı davranışına odaklanmasını kolaylaştırmaktadır.

## 🔐 Session Yönetimi
Login gerektiren testlerde gereksiz authentication tekrarlarını azaltmak amacıyla cy.session() kullanılmaktadır.
Bu karar özellikle projenin kontrollü bir QA ortamı yerine herkese açık canlı bir web sitesi üzerinde çalışması nedeniyle önem kazanmıştır.
Tekrarlanan otomatik login işlemleri sitenin güvenlik mekanizmalarını tetikleyebilmektedir.
Genel yaklaşım:
```text
Login gerekli
      ↓
Session mevcut mu?
   ↙         ↘
 Evet       Hayır
  ↓           ↓
Kullan      Login oluştur
```

Bu sayede login işleminin yalnızca test için bir ön koşul olduğu senaryolarda gereksiz tekrarların azaltılması amaçlanmıştır.

## 🌐 Asenkron İşlemlerin Yönetimi
Bazı filtreler ve sayfa bileşenleri backend istekleri tamamlandıktan sonra oluşturulmaktadır.
Bu durumlarda yalnızca sabit süre beklemek yerine ilgili network request'in tamamlanmasını takip etmek amacıyla cy.intercept() kullanılmaktadır.
Örneğin:
```text
Kullanıcı aksiyonu
       ↓
API isteği
       ↓
cy.wait("@loadFilters")
       ↓
UI doğrulaması
```

Bu yaklaşım, yalnızca:
cy.wait(5000);

gibi sabit beklemelere bağımlılığı azaltarak testlerin uygulamanın gerçek davranışıyla senkronize çalışmasını amaçlamaktadır.

## 🚧 Karşılaşılan Teknik Zorluklar ve Çözümleri
Proje herkese açık canlı bir web sitesi üzerinde geliştirildiği için otomasyon sırasında farklı teknik problemlerle karşılaşılmıştır.

<details>
<summary><b>🔐 1. CAPTCHA ve Tekrarlanan Login İşlemleri</b></summary>
Problem
Kısa süre içerisinde tekrarlanan otomatik login denemeleri sitenin güvenlik mekanizmasını tetikleyerek CAPTCHA görüntülenmesine neden olabilmektedir.
Teknik Karar
CAPTCHA bir anti-bot güvenlik mekanizması olduğundan otomasyon tarafından bypass edilmeye çalışılmamıştır.
Çözüm
Login işleminin yalnızca başka bir testin ön koşulu olduğu durumlarda gereksiz login tekrarlarını azaltmak amacıyla cy.session() kullanılmıştır.
CAPTCHA'nın aktif hale gelmesi hâlâ otomatik test çalışmasını etkileyebilen bir canlı ortam kısıtıdır.
</details>

<details>
<summary><b>⚠️ 2. Üçüncü Parti JavaScript Exception</b></summary>
Problem
Test çalışmaları sırasında site üzerinde: google_trackConversion is not a function hatasıyla karşılaşılmıştır.
Bu hata test edilen business flow'dan bağımsız bir third-party tracking kodundan kaynaklanmaktadır.
Teknik Karar
Tüm uncaught:exception hatalarını kapatmak gerçek uygulama hatalarının da testler tarafından gözden kaçırılmasına neden olabileceğinden tercih edilmemiştir.
Çözüm
Yalnızca bilinen hata seçici olarak filtrelenmiştir.
```javascript
Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("google_trackConversion is not a function")) {
        return false;
    }
});
```
Böylece bilinmeyen uygulama exception'larının otomatik olarak bastırılması önlenmiştir.
</details>
<details>
<summary><b>🎯 3. Dinamik ID'ler</b></summary>
Problem
Bazı elementlerin ID değerleri çalışma zamanında değişmektedir.
Çözüm
Gerekli durumlarda prefix selector kullanılmıştır.
[id^="product-addcart-button-"]
Bu sayede locator'ın dinamik ID'nin tamamına bağımlılığı azaltılmıştır.
</details>
<details>
<summary><b>🌐 4. Asenkron Filtrelerin Yüklenmesi</b></summary>
Problem
Arama sonuçlarında bazı filtrelerin DOM'a eklenmesi backend isteğinin tamamlanmasına bağlıdır.
Elementi doğrudan aramak zaman zaman testin uygulamadan daha hızlı ilerlemesine neden olabilmektedir.
Çözüm
İlgili network isteği cy.intercept() ile takip edilerek assertion öncesinde isteğin tamamlanması beklenmiştir.
Böylece sabit bekleme süresi yerine uygulamanın gerçek network davranışıyla senkronizasyon sağlanmıştır.
</details>
<details>
<summary><b>🖱️ 5. Hover ile Görüntülenen Elementler</b></summary>
Problem
Bazı ürün kartlarında Sepete Ekle butonu DOM içerisinde bulunmasına rağmen hover gerçekleşmeden kullanıcı tarafından görünür değildir.
Bu nedenle:
Element exists ile Element is visible and interactable aynı durum değildir.
Çözüm
Gerçek kullanıcı hover davranışına daha yakın bir etkileşim oluşturmak amacıyla cypress-real-events paketindeki:
realHover();
kullanılmış ve butonun görünür duruma geldiği ayrıca doğrulanmıştır.
Canlı sitedeki UI timing nedeniyle ilgili görünürlük kontrolünde Cypress retry mekanizmasından yararlanılmıştır.
</details>
<details>
<summary><b>🛒 6. Sepete Eklenemeyen Ürünler</b></summary>
Problem
Canlı ürün kataloğunda arama sonucunda görüntülenen her ürün o anda sepete eklenebilir durumda olmayabilir.
Testin her zaman ilk ürünü başarılı kabul etmesi bu nedenle kararsız sonuçlara yol açabilmektedir.
Çözüm
Tekrar kullanılabilir sepete ekleme akışı oluşturulmuştur.
Temel algoritma:
```text
Ürünü seç
    ↓
Mevcut sepet sayısını oku
    ↓
Sepete eklemeyi dene
    ↓
Yeni sepet sayısını oku
    ↓
Sayı arttı mı?
   ↙       ↘
 Evet      Hayır
  ↓          ↓
Başarılı   Sonraki ürünü dene
```

İstenen ürün sayısına ulaşıldığında akış sepet sayfasına devam etmektedir.
Bu çözüm, canlı ürün verisine karşı testin daha dayanıklı olmasını amaçlamaktadır.
</details>
<details>
<summary><b>💰 7. Ondalık Sayı / Fiyat Hassasiyeti</b></summary>

Problem
Checkout toplamı doğrulanırken JavaScript floating-point gösterimi nedeniyle aşağıdaki gibi değerlerle karşılaşılmıştır:
28903.1
28903.100000000002

İşlevsel olarak aynı fiyatı temsil eden bu değerler strict equality kullanıldığında testin yanlış şekilde başarısız olmasına neden olabilmektedir.
Çözüm
Para değerinin gerekli hassasiyeti korunarak karşılaştırma toleranslı yapılmıştır.
expect(generalTotal)
    .to.be.closeTo(cartTotal + shoppingFee, 0.01);

Bu şekilde gerçek fiyat farklılıkları kontrol edilmeye devam edilirken JavaScript'in floating-point temsilinden kaynaklanan teknik farkın false-negative üretmesi önlenmiştir.
</details>

## 📈 Test Evidence & Raporlama
Test sonuçlarının yalnızca terminal çıktısına bağlı kalmaması için farklı test evidence mekanizmaları kullanılmaktadır.

- Screenshots
Her test sonrasında ekran görüntüsü oluşturulur.
Ayrıca Cypress'in failure screenshot mekanizması aktiftir.
Ekran görüntüleri:
cypress/screenshots/ altında saklanmaktadır.

- Videos
Headless cypress run çalıştırmalarında video kaydı aktiftir.
cypress/videos/ altında oluşturulur.

- Mochawesome
Test sonuçlarının daha okunabilir şekilde incelenebilmesi için Mochawesome HTML/JSON raporlaması kullanılmaktadır.
Raporlar:
cypress/reports/ altında oluşturulmaktadır.

Bu çıktılar test sonuçlarının izlenmesi, başarısız senaryoların incelenmesi ve proje demosunda execution evidence sunulması amacıyla kullanılmaktadır.

## 🚀 Kurulum ve Çalıştırma
Projeyi çalıştırmak için sistemde Node.js ve npm kurulu olmalıdır.
Repository'yi klonlayın:
git clone https://github.com/semragenc/kitapsepeti-cypress-automation.git

Proje klasörüne geçin:
cd kitapsepeti-cypress-automation

Bağımlılıkları yükleyin:
npm ci

Testlerin Çalıştırılması
Cypress Test Runner
npx cypress open

Tüm Testler
npx cypress run

Belirli Bir Test Dosyası
Örneğin yalnızca arama senaryolarını çalıştırmak için:
npx cypress run --spec "cypress/e2e/tests/search.cy.js"

Login gerektiren testlerde cypress/fixtures/testData.json içerisindeki test hesabı kullanılmaktadır.
Gerçek kişisel bilgiler veya gerçek ödeme bilgileri kullanılmamalıdır.

## ⚠️ Bilinen Kısıtlar
Proje kontrollü bir QA/Test ortamı yerine herkese açık Kitapsepeti.com canlı sitesi üzerinde çalışmaktadır.
Bu nedenle aşağıdaki dış faktörler otomasyon sonuçlarını etkileyebilir:
- CAPTCHA'nın aktif hale gelmesi
- Ürün stok veya satın alınabilirlik durumunun değişmesi
- Network gecikmeleri
- Üçüncü parti script davranışları
- Sayfanın asenkron yüklenmesi
- DOM/UI değişiklikleri
- Bazı ürün kartlarında Sepete Ekle aksiyonunun kullanılabilir olmaması
- Bazı ürünlerde beklenen detay bilgilerinin bulunmaması
- Canlı sitedeki kargo seçeneklerinin ve varsayılan kargo firmasının test gereksinimlerinde tanımlanan seçeneklerden farklılaşabilmesi
- Canlı ürün verisinin değişmesi
Bu nedenle başarısız bir otomasyon sonucu doğrudan ürün hatası olarak değerlendirilmeden önce problemin kaynağı ayrıştırılmalıdır:
```text
Test Failure
     ↓
 ┌─────────────────────┐
 │ Application Defect  │
 │ Automation Issue    │
 │ Test Data Issue     │
 │ Environment Issue   │
 │ Third-party Issue   │
 └─────────────────────┘
 ```

## 🔒 Güvenlik ve Test Sınırları
Bu proje yalnızca QA/Test Automation amacıyla geliştirilmiştir.
- CAPTCHA bypass edilmez.
- Gerçek ödeme gerçekleştirilmez.
- Gerçek sipariş oluşturulmaz.
- Gerçek kredi kartı bilgileri kullanılmaz.
- Testler ödeme işlemini tamamlamadan sonlandırılır.

## 📦 Proje Çıktıları
Proje sonunda aşağıdaki çıktılar sunulmaktadır:
1. Test Senaryoları
User Story ve Acceptance Criteria bazlı test kapsamı ve otomasyon eşleştirmesi.
2. Cypress Automation Repository
Page Object Model, test specs, fixtures, custom commands ve Cypress konfigürasyonunu içeren kaynak kod.
3. Test Execution Evidence
- Mochawesome raporları
- Test screenshots
- Execution videos
Bu çıktılar birlikte kullanılarak test kapsamının hem kod hem de çalıştırma sonuçları açısından izlenebilir olması hedeflenmiştir.


Proje Sahibi
Semra GENÇ
QA Engineer

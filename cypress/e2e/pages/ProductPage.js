class ProductPage {
    productName = "#product-title";
    authorName = "a[id='model-title'] span";
    publisherName = "#brand-title";
    productPrice = ".product-current-price.fw-black";
    productInformations = [
        this.productName,
        this.authorName,
        this.publisherName,
        this.productPrice
    ];
    productInformationSection = ".book-info-wrapper";
    productDetailLabels = [
        "Türü",
        "ISBN",
        "Sayfa Sayısı",
        "Kağıt Tipi",
        "Basım Yılı"
    ];
    addToCartButton= "#addToCartBtn";
    addToCartSuccessMessage = ".t-modal-content .product-cart-title";
    goToCartPopupButton = "#cart-popup-go-cart";
    buyNowPopupButton = "#cart-popup-continue-shopping"; 

}
export default new ProductPage();
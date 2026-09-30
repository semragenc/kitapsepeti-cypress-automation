class ShoppingCartPage {
    cartIcon = "#header-cart-btn";
    cartNavigation = '[id^="header-cart-panel-"].drawer-wrapper';
    goToCartButton = "#go-cart-btn";
    popupCloseButton = ".t-modal-container .t-modal-close";
    cartItems = ".cart-item";
    productName = ".d-block.cart-item-title";
    productQuantity = '.cart-item-qty input[type="number"]';
    priceValue = ".price-sell";
    cartPriceContainer = "#cart-price-container";
    cartPriceRows = ".cart-price-box > .row";
    increaseQuantityButton = ".cart-item-qty .ti-plus";
    deleteProductButton = ".cart-item-delete";
    deleteConfirmPopup = ".t-popconfirm-inner";
    deleteConfirmButtons = ".t-popconfirm-buttons > button";
    clearCartButton = '[id^="clear-cart-btn-"]';
    emptyCartMessage = ".cart-empty > p";
    continueShoppingButton = "#cart-back-btn";
    checkoutButton = "#cart-buy-btn";
}

export default new ShoppingCartPage();
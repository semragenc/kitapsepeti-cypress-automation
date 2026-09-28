class SearchPage {
    searchInput = "#live-search";
    searchButton = "#live-search-btn";
    productCards = ".product-item";
    productList = '[data-selector=".product-detail-card"]';
    productImage = ".image-inner img";
    productName = ".product-title";
    publisherName = ".brand-title";
    authorName = ".model-title";
    productPrice = ".current-price";
    sortButton = "#sort";
    addToCartButton = '[id^="product-addcart-button-"]';
    categoryFilter = 'h5[id^="accordion-categories-"]';
    categoryOptions = '[id^="filter-categories-"]';
    brandFilter = 'h5[id^="accordion-brand-"]';
    brandOptions = '[data-filter-search="filter-search-brand"] > .filter-list-item';
    modelFilter = '[id^="accordion-model-"]';
    modelOptions = '[data-filter-search="filter-search-model"] .filter-list-item';
    mainMenuCategories = "#main-menu ul.menu > li.menu-new > a";
    categoryTitle = ".category-name";
    productDetailCards = ".row .product-detail-card";
}
export default new SearchPage();
import { setLocalStorage } from "../js/utils.mjs"

export default class ProductDetails {
  constructor(dataSource, productId, formatter) {
    this.dataSource = dataSource;
    this.productId = productId;
    this.product = {};
    this.formatter = formatter
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    await this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
    
  }
  addToCart() {
    setLocalStorage("so-cart", [this.product]);
  }
  async renderProductDetails() {
      const  { 
        Brand, 
        NameWithoutBrand,
        Image, 
        Name, 
        ListPrice, 
        Colors, 
        DescriptionHtmlSimple, 
        Id 
      } = this.product
      const productDetail = document.getElementsByClassName("product-detail")[0]
      productDetail.innerHTML = `
        <h3>${Brand.Name}</h3>

        <h2 class="divider">${NameWithoutBrand}</h2>

        <img
          class="divider"
          src="${Image}"
          alt="${Name.split("-")[0]}"
        />

        <p class="product-card__price">${this.formatter.format(ListPrice)}</p>

        <p class="product__color">${Colors[0].ColorName}</p>

        <p class="product__description">
          ${DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${Id}">Add to Cart</button>
        </div>
      `
  }
}

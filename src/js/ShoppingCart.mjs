import { getLocalStorage, setLocalStorage, formatter } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div>
    <p class="cart-card__quantity">qty: 1</p>
    <button id=${item.Id} class="remove-btn">x</button>
  </div>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    const cartFooter = document.getElementsByClassName("cart-footer")[0]
    if(cartItems && cartItems.length > 0){
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      const totalPrice = cartItems.reduce((total, item) => item.FinalPrice + total, 0)
      cartFooter.classList.remove("hide");
      const p = document.createElement("p")
      p.innerHTML = `Total: ${formatter.format(totalPrice)}`
      cartFooter.appendChild(p) 
      document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");

      document.querySelectorAll(".remove-btn").forEach((item) => {
        document.getElementById(item.id).addEventListener("click", function() {
          const itemToBeRemoved = cartItems.find((cartitem) => cartitem.Id === item.id)
          const index = cartItems.indexOf(itemToBeRemoved)
          cartItems.splice(index,1)
          document.getElementById(item.id).parentNode.parentNode.remove()
          setLocalStorage("so-cart", cartItems);
        })
      })
    }
  }
}

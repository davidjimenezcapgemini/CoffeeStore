import { Cart } from "./cart.js";

class DetailPage {
  constructor() {
    this.product = undefined;
    this.cart = new Cart();
  }

  async init() {
    this.product = await fetch("../data/detail.json")
      .then((data) => data.json())
      .then((res) => res.product);
    this.createProduct(product);
  }

  addProduct() {
      this.cart.add(product);
  }

  createProduct(data) {
    const container = document.querySelector("");

    const column = document.createElement("div");
    column.setAttribute("class", "col hovered");

    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("id", data.id);

    const cardHeader = document.createElement("div");
    cardHeader.setAttribute("class", "card-header");

    const img = document.createElement("img");
    img.setAttribute("src", data.img);

    const cardFooter = document.createElement("div");
    cardFooter.setAttribute("class", "card-footer text-center");

    const title = document.createElement("h4");
    title.innerHTML = data.title;

    const price = document.createElement("h5");
    price.innerHTML = `${data.price}€`;

    cardFooter.appendChild(title);
    cardFooter.appendChild(price);

    cardHeader.appendChild(img);

    card.appendChild(cardHeader);
    card.appendChild(cardFooter);

    column.appendChild(card);

    container.appendChild(column);
  }
}

const cardDetail = new DetailPage();
console.log("cardDetail", cardDetail);

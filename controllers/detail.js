import { Cart } from "./cart.js";

class DetailPage {
  constructor() {
    this.product = undefined;
    this.cart = new Cart();
    this.quantity = 0;
  }

  async init() {
    this.product = await fetch("../data/detail.json")
      .then((data) => data.json())
      .then((res) => res['1']);
    this.createProduct(this.product);
    this.addQuantityListener();
    this.addCartListener();

  }

  addProduct() {
    console.log(this.product, this.quantity);
    $('#cartModal').modal('show');
    this.cart.add(this.product, this.quantity);
  }

  addCartListener() {
    const button = document.querySelector('.cuantityEl .addToCart');
    button.addEventListener('click', () => this.addProduct());
  }

  addQuantityListener() {
    const input = document.querySelector('#inputEmail4');
    input.addEventListener('change', (ev) => this.quantity = ev.target.value);
  }

  createProduct(data) {
    const img = document.querySelector('.productCard img');
    img.setAttribute('src', data.img);
  
    const title = document.querySelector('.card-title');
    title.innerHTML = data.title;

    const description = document.querySelector('.card-text');
    description.innerHTML = data.description;

    const price = document.querySelector('#price h2');
    price.innerHTML = `${data.price}€`;

  }
}

const cardDetail = new DetailPage();
cardDetail.init();

class Main {
  constructor() {
    this.min = 0;
    this.max = 5;
    this.products = [];
  }

  async init() {
    this.initInputListeners();
    this.products = await fetch("../data/products.json")
      .then((data) => data.json())
      .then((res) => res.products);
    this.products.forEach((card) => {
      const container = document.querySelector(
        ".first.container.best-sellers .row.row-cols-1.row-cols-md-2.row-cols-lg-2"
      );
      this.createCard(container, card);
    });
    this.initCardListeners();
  }

  initInputListeners() {
    const min = document.getElementById("inputMin");
    const max = document.getElementById("inputMax");

    min.addEventListener("change", (ev) => this.changeMinInput(ev));
    max.addEventListener("change", (ev) => this.changeMaxInput(ev));
  }

  initCardListeners() {
    const cards = document.querySelectorAll(".best-sellers .card");
    cards.forEach((card) => {
      card.addEventListener("click", () => this.cardClicked(card.id));
      // card.addEventListener('click', function() { console.log(this); this.cardClicked(card.id)} )
    });
  }

  cardClicked(id) {
    window.location.href = `productDetails.html?id=${id}`;
  }

  changeMinInput(ev) {
    this.min = ev.target.value;
    const filterProducts = this.products.filter(
      (card) => card.price >= this.min && card.price <= this.max
    );
    this.updateDOM(filterProducts);
  }

  changeMaxInput(ev) {
    this.max = ev.target.value;
    const filterProducts = this.products.filter(
      (card) => card.price >= this.min && card.price <= this.max
    );
    this.updateDOM(filterProducts);
  }

  updateDOM(cards) {
    const container = document.querySelector(
      ".first.container.best-sellers .row.row-cols-1.row-cols-md-2.row-cols-lg-2"
    );
    this.clearCards(container);
    cards.forEach((card) => {
      const container = document.querySelector(
        ".first.container.best-sellers .row.row-cols-1.row-cols-md-2.row-cols-lg-2"
      );
      this.createCard(container, card);
    });
  }

  clearCards(container) {
    const cards = container.querySelectorAll(".card");
    for (const card of cards) {
      card.remove();
    }
  }

  createCard(container, data) {
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

const main = new Main();
main.init();

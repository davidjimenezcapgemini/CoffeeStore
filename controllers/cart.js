export class Cart {
    constructor() {
        this.product = undefined
    }

    add(product, quantity) {
        this.product = {... product};
        this.product.quantity = quantity;
    }
}
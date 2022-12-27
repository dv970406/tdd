const ProductClient = require("./product_client");
class ProductService {
  constructor() {
    // 클래스 호출 시에 따로 productClient를 받아서 사용하지 않음(의존성 주입X)
    this.productClient = new ProductClient();
  }

  fetchAvailableItems() {
    return this.productClient
      .fetchItems()
      .then((items) => items.filter((item) => item.available));
  }
}

module.exports = ProductService;

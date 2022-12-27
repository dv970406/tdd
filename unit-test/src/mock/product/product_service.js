class ProductService {
  // 클래스 호출 시 productClient를 받아서 사용(의존성 주입)
  constructor(productClient) {
    this.productClient = productClient;
  }

  fetchAvailableItems() {
    return this.productClient
      .fetchItems()
      .then((items) => items.filter((item) => item.available));
  }
}

module.exports = ProductService;

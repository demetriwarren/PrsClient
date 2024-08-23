import { Product } from "../products/Product";

export class RequestLine {
  id: number | undefined;
  requestId: number | undefined;
  productId: number | undefined;
  quantity = 0 ;
  product: Product | undefined

  get isNew(): boolean {
    return this.id === undefined;
  }
  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.requestId) this.requestId = initializer.requestId;
    if (initializer.productId) this.productId = initializer.productId;
    if (initializer.quantity) this.quantity = initializer.quantity;
    if (initializer.product) this.product = initializer.product;
  }
}

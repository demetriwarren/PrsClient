export class RequestLine {
  id: number | undefined;
  requestId: number | undefined;
  productId: number | undefined;
  quantity = 1;

  get isNew(): boolean {
    return this.id === undefined;
  }
  constructor(initializer?: any) {
    if (!initializer.id) return;
    if (initializer.id) this.id === initializer.id;
    if (initializer.requestId) this.requestId === initializer.requestId;
    if (initializer.productId) this.productId === initializer.productId;
    if (initializer.quantity) this.quantity === initializer.quantity;
  }
}

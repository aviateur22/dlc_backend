/**
 * Model ProductEntity
 */
class ProductEntity implements ProductEnityInterface {
  id: number;
  productImageUrl: string;
  openDate: Date;

  constructor(id: number, productImageUrl: string, openDate: Date) {
    this.id = id;
    this.productImageUrl = productImageUrl;
    this.openDate = openDate;
  }
}

export {ProductEntity}
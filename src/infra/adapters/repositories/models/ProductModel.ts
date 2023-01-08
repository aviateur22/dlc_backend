/**
 * Model Product
 */
class ProductModel implements ProductModelInterface {
  id: number;
  openDate: Date;
  productImageUrl: string;
  createdDate: Date;
  updatedDate: Date;

  constructor(id: number, openDate: Date, productImageUrl: string, createdDate: Date, updatedDate: Date) {
    this.id = id;
    this.openDate = openDate;
    this.productImageUrl = productImageUrl;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }

}
export { ProductModel }
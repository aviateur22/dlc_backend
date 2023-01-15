/**
 * Model ProductEntity
 */
class ProductEntity {
  id: number;
  openDate: Date;
  productImageUrl: string;
  createdDate: Date;
  updatedDate: Date
  
  constructor(
    id: number,
    productImageUrl: string, 
    openDate: Date, 
    createdAt: Date, 
    updatedAt: Date
    ) {
    this.id = id;
    this.productImageUrl = productImageUrl;
    this.openDate = openDate;
    this.createdDate = createdAt;
    this.updatedDate = updatedAt;
  }
}

export { ProductEntity }
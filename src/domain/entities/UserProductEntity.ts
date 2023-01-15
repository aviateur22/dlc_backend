/**
 * Entité UserProduct
 */
class UserProductEntity {
  protected userId: number;
  protected productId: number;
  protected createdAt: Date;

  constructor(productId: number, userId: number, createdAt: Date) {
    this.productId = productId;
    this.userId = userId;
    this.createdAt = createdAt
  }
}

export { UserProductEntity }
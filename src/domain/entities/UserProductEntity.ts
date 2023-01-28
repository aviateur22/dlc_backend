/**
 * Entité UserProduct
 */
class UserProductEntity {
  protected id: number;
  protected userId: number;
  protected productId: number;
  protected createdAt: Date;

  constructor(id: number, productId: number, userId: number, createdAt: Date) {
    this.id = id;
    this.productId = productId;
    this.userId = userId;
    this.createdAt = createdAt
  }
}

export { UserProductEntity }
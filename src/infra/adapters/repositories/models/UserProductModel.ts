/**
 * Modèle UserProductModel
 */
class UserProductModel {
  readonly id: number;
  readonly userId: number;
  readonly productId: number;
  readonly createdAt: Date;

 constructor(id: number, userId: number, productId: number, createdAt: Date) {
  this.id = id;
  this.userId = userId;
  this.productId = productId;
  this.createdAt = createdAt;
 }
}
export { UserProductModel }
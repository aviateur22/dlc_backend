/**
 * Repository UserProduct
 */
interface UserProductRepositoryInterface {

  /**
   * Ajout
   * @param { number } userId 
   * @param { number } productId 
   */
  save(userProduct: UserProductAddInterface): Promise<UserProductModel|null>;

  /**
   * Recherche
   * @param { number } userId 
   * @param { number } productId 
   */
  findOne(userId: number, productId: number): Promise<UserProductModel|null>;

  /**
   * Supprime tout
   */
  deleteAll(): void
    
 
}

export { UserProductRepositoryInterface }
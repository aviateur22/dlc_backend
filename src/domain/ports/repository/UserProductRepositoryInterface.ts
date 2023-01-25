import { UserProductModel } from "../../../infra/adapters/repositories/models/UserProductModel";

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
  deleteAll(): Promise<void>

  /**
   * Suppression de 1 userProduct
   * @param userId 
   * @param productId 
   */
  deleteOne(userId: number, productId: number): Promise<void>
    
 
}

export { UserProductRepositoryInterface }
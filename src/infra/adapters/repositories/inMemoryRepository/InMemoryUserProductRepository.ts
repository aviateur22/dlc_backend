import { UserProductRepositoryInterface } from "../../../../domain/ports/repository/UserProductRepositoryInterface";
import { UserProductModel } from "../models/UserProductModel";

class InMemoryUserProductRepository implements UserProductRepositoryInterface {
  
  /**
   * Liste des userProducts
   */
  protected userProducts: Array<UserProductModel> = [];

  /**
   * Sauvegarde d'un UserProduct
   * @param { UserProductAddInterface } userProduct 
   * @returns 
   */
  async save(userProduct: UserProductAddInterface): Promise<UserProductModel|null> {   
    // Recherche id 
    const id = this.userProducts.length === 0 ? 1 : Math.max(...this.userProducts.map(x=>x.id)) + 1;

    // Ajout element
    const addUserProduct: UserProductModel = new UserProductModel(
      id,
      userProduct.productId, 
      userProduct.userId,
      new Date()
    );
    
    this.userProducts.push(addUserProduct);
    return addUserProduct;
  }

  /**
   * Recherche UserProduct
   * @param { number }  userId 
   * @param { number } productId 
   * @returns { UserProductModel|null }
   */
  async findOne(userId: number, productId: number): Promise<UserProductModel|null> {
    // Recherche UserProduct
    const findUserProduct: UserProductModel|undefined = this.userProducts.find(x => (x.userId === userId && x.productId === productId ));

    if(!findUserProduct) {
      return null;
    }

    return findUserProduct;
  }

  /**
   * Recherche de tous les produit d'un utilisateur
   * @param userId
   * @returns {UserProductModel | null}
   */
  async findAllByUser(userId: number): Promise<Array<UserProductModel>|null> {
    // Recherche UserProduct
    const findUserProducts: Array<UserProductModel> = this.userProducts.filter(x => x.userId === userId);

    if(findUserProducts.length === 0) {
      return null;
    }

    return findUserProducts;
  }

  /**
   * Suppression de tous les userProduct
   */
  async deleteAll(): Promise<void> {
    this.userProducts = []
  }

  /**
   * Suppression de 1 userProduct
   * @param userId 
   * @param productId 
   */
  async deleteOne(userId: number, productId: number): Promise<void> {
    this.userProducts = this.userProducts.filter(userProduct=>userProduct.id !== productId && userProduct.userId !== userId);
  }
}

export { InMemoryUserProductRepository }
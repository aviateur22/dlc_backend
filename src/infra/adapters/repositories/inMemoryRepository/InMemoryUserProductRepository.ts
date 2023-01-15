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

  async deleteAll(): Promise<void> {
    this.userProducts = []
  }
}

export { InMemoryUserProductRepository }
import { ProductModel } from "../../../infra/adapters/repositories/models/ProductModel";
import { Repository } from "../../../services/instanciateService/Repository";
import { UseCases } from "../../../services/instanciateService/UseCases";
import { Utilities } from "./Utilities";

/**
 * Ajout de produit
 */
class Product {

  /**
   * Liste de produit
   */
  private static products = [
    {
      openDate: new Date('2023-01-31 15:25:00'),
      productImageUrl: 'wwwww//ddddd-d'
    },
    {
      openDate: new Date('2023-01-31 15:25:00'),
      productImageUrl: 'wwwww//ddddd-d'
    },
    {
      openDate: new Date('2023-01-31 15:25:00'),
      productImageUrl: 'wwwww//ddddd-d'
    }
  ]

 /**
  * Ajout de 1 produit
  * @returns ProductModel
  */
  static async addOneProduct(userId: number): Promise<void> {

    // Index aléatoire products
    const randomIndex = Utilities.randomIndexFromArray(Product.products);

    await UseCases.getUseCases().addProductUseCase.execute(Product.products[randomIndex], userId);
  }

  /**
   * Ajout de plusieurs produit
   * @param userId 
   */
  static async addProducts(userId: number): Promise<void> {
    Product.products.forEach(async product => {
      await UseCases.getUseCases().addProductUseCase.execute(product, userId);
    });
  }
}

export { Product }
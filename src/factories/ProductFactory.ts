import { ProductEntity } from "../domain/entities/ProductEntity";

/**
 * Chargement des modèles associés à Product
 */
class ProductFactory {
  
  /**
   * Renvoie le modèle ProductEntity 
   * @returns {ProductEnityInterface}
   */
  static getProductEntity(id: number, productImageUrl: string, openDate: Date): ProductEnityInterface {
    return new ProductEntity(id, productImageUrl, openDate);
  }
}

export { ProductFactory }
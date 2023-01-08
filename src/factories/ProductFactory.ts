import { ProductEntity } from "../domain/entities/ProductEntity";

/**
 * Chargement des modèles associés à Product
 */
class ProductFactory {
  
  /**
   * Renvoie le modèle ProductEntity 
   * @returns {ProductEnityInterface}
   */
  static getProductEntity(id: number): ProductEnityInterface {
    return new ProductEntity(id);
  }
}

export { ProductFactory }
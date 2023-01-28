import { ProductModel } from "../../../infra/adapters/repositories/models/ProductModel";
/**
 * Interface ProductRepository
 */
interface ProductRepositoryInterface {
  
  /**
   * Ajout d'un produit
   * @param { ProductAddInterface } product 
   * @returns { ProductModelInterface }
   */
  save(product: ProductAddInterface): Promise<ProductModel>;

  /**
   * Recherche d'un produit
   * @param { number } id - Produit recherché 
   * @returns { ProductEnityInterface|null }
   */
  findOne(id: number): Promise<ProductModel|null>;

  /**
   * Mise à jour d'un produit
   * @param { productUpdateInterface } product 
   */
  updateOne(product: productUpdateInterface): Promise<ProductModel>;

  /**
   * Supprssion de tous les produits
   */
  deleteAll(): Promise<void>;

  /**
   * Suppression d'un produit
   */
  deleteOne(id: number): Promise<void>;

}

export { ProductRepositoryInterface }
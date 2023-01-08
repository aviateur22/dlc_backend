/**
 * Interface ProductRepository
 */
interface ProductRepositoryInterface {
  
  /**
   * Ajout d'un produit
   * @param {ProductAddInterface} product 
   * @returns {ProductModelInterface}
   */
  save(product: ProductAddInterface): Promise<ProductModelInterface>;

  /**
   * Recherche d'un produit
   * @param {ProductInterface} product - Produit recherché 
   * @returns {ProductEnityInterface|null}
   */
  findOne(product: ProductEnityInterface): Promise<ProductEnityInterface|null>;

  /**
   * Supprssion de tous les produits
   */
  deleteAll(): Promise<void>;

}

export { ProductRepositoryInterface }
/**
 * Interface ProductRepository
 */
interface ProductRepositoryInterface extends RepositoryBaseInterface {
  
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
  findOne(product: ProductInterface): Promise<ProductEnityInterface|null>;

}

export { ProductRepositoryInterface }
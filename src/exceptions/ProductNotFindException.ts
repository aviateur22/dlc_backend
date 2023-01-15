/**
 * Exception produit non trouvé
 */
class ProductNotFindException extends Error {
  constructor(message?: string) {
    super(message);
    this.message = 'Le produit recherché n\'existe pas';
  }
}
export { ProductNotFindException }
/**
 * Exception utilisateur pas rattaché au produit 
 */
class UserProductNotMatchException extends Error {
  constructor(message?: string) {
    super(message);

    this.message = 'Le produit n\'est pas rattaché à votre compte';
  }
}
export { UserProductNotMatchException }
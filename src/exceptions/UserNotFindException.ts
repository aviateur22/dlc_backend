/**
 * Exception utilisateur inconnu
 */
class UserNotFindException extends Error {
  constructor(message?: string) {
    super(message);
    this.message = 'L\'utilisateur n\'est pas trouvé en base de données';    
  }
}
export {UserNotFindException}
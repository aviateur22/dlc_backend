/**
 * Exception utilisateur inconnu
 */
class UserNotFindException extends Error {
  constructor(message: string) {
    super(message)
  }
}
export {UserNotFindException}
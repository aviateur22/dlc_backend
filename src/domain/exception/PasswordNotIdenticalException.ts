/**
 * Exception mot de passe pas identique
 */
class PasswordNotIdenticalException extends Error{
  constructor(message: string) {
    super(message)
  }
}
export {PasswordNotIdenticalException}
/**
 * Exception mot de passe inexistant 
 */
class PasswordMissingException extends Error {
  constructor(message: string) {
    super(message)
  }
}

export {PasswordMissingException}
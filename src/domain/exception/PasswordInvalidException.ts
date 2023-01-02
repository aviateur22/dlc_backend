/**
 * Exception mot de passe invalide
 */
class PasswordInvalidException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export {PasswordInvalidException}
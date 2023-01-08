/**
 * Exception Password Sécurity nom défini
 */
class PasswordSecurityMissingException extends Error {
  constructor(message: string) {
    super(message)
  }
}
export {PasswordSecurityMissingException}
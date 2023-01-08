import { bcryptPasswordSecurity } from "../infra/adapters/securities/PasswordSecurity";

/**
 * Chargement des modeles 
 */
class SecurityFactory {

  /**
   * Modele protection mot de passe
   */
  static getPasswordSecurity(): PasswordSecurityInterface {
    return new bcryptPasswordSecurity();
  }
}

export { SecurityFactory };
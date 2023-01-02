/**
 * Interface implementation sécurité mot de passe
 */
interface PasswordSecurityInterface {

  /**
   * Applique la sécurité au mot de passe
   * 
   * @param {string} password
   * @returns {string} 
   */
  setPasswordSecurity(password: string): Promise<string>;

  /**
   * Récupération mot de passe original
   * 
   * @param {string} securityPassword 
   * @returns {string}
   */
  comparePassword(securityPassword: string, originalPassword: string): Promise<boolean>;
}
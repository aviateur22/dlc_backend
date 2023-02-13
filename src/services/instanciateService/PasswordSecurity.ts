import { bcryptPasswordSecurity } from "../../infra/adapters/securities/PasswordSecurity";

class PasswordSecurityService {

  protected static PasswordSecurity: PasswordSecurityInterface;
  
  /**
   * Modele protection mot de passe
   */
  static getPasswordSecurity(): PasswordSecurityInterface {
    if(!PasswordSecurityService.PasswordSecurity) {
      PasswordSecurityService.PasswordSecurity = new bcryptPasswordSecurity();
    }
    return PasswordSecurityService.PasswordSecurity;
  }
}
export { PasswordSecurityService }
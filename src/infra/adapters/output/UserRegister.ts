/**
 * Modèle UserRegister
 * Allant de INFRA vers le DOMAIN
 */
class UserRegister implements UserRegisterInterface {
  email: string;
  password: string;
  confirmPassword: string;

  constructor(email: string, password: string, confirmPassword: string) {
    this.email = email;   
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}

export { UserRegister };
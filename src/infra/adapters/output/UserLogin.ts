/**
 * Modèle UserLogin
 * Allant de INFRA vers le DOMAIN
 */
class UserLogin implements UserLoginInterface {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;   
    this.password = password;
  }
}

export { UserLogin };
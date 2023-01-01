/**
 * Model implementé pour renvoyer la donnée sur l'utilisteur
 */
class UserOutpoutModel implements UserOutputInterface {
  email: string;
  name: string;
  userImageUrl: string;
  
  constructor(email: string, name: string, userImageUrl: string) {
    this.email = email;
    this.name = name;
    this.userImageUrl = userImageUrl;
  }
}

export { UserOutpoutModel }
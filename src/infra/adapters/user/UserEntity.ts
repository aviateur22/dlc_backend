/**
 * Modele User
 * Allant du DOMAIN vers l'INFRA
 */
class UserEntity implements UserEntityInterface {
  email: string;
  name: string;
  userImageUrl: string;

  constructor(email: string, name: string, userImageUrl: string) {
    this.email = email;
    this.name = name;
    this.userImageUrl = userImageUrl;
  }
  
}

export {UserEntity}
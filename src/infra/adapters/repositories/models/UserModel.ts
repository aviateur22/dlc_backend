/**
 * Implémentation du UserModelInterface
 */
class UserModel implements UserModelInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  userImageUrl: string

  constructor(id: number, email: string, password: string, userImageUrl: string, name: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.userImageUrl = userImageUrl    
  }
}

export { UserModel }
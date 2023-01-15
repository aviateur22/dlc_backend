/**
 * Implémentation du UserModelInterface
 */
class UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  userImageUrl: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number, 
    email: string, 
    password: string, 
    userImageUrl: string, 
    name: string,
    updatedAt: Date,
    createdAt: Date
    ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.userImageUrl = userImageUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export { UserModel }
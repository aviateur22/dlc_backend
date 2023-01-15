/**
 * Entité User
 */
class UserEntity {
  id: number;
  email: string;
  name: string;
  userImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  
  constructor(
    id: number, 
    email: string,
    name: string, 
    userImageUrl: string, 
    createdAt: Date, 
    updatedAt: Date
    ) {
    this.id = id;
    this.email = email;
    this.userImageUrl = userImageUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.name = name;
  }  
}
export { UserEntity }
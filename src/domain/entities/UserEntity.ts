/**
 * Entité User
 */
class UserEntity implements UserEntityInterface {
  id: number;
  email: string;

  constructor(id: number, email: string) {
    this.id = id;
    this.email = email;
  }  
}
export { UserEntity }
import { UserEntity } from "../entities/UserEntity";
import { UserInputInterface } from "../inputs/user/UserInputInterface";
import { UserRepositoryInterface } from "../provider/userRepository/UserRepositoryInterface";

class InMemoryUserRepository implements UserRepositoryInterface {

  protected users: Array<UserEntity> = [];

  protected user: UserEntity = {
    name: 'cyrille',
    email: 'aviateur22@hotmail.fr',
    password: 'affirmer2011',
    userImageUrl: 'wwww'
  }
  constructor() {
    this.users.push(this.user);
  }

  getOneUser(userInput: UserInputInterface): UserEntity|undefined {
    const findUser: UserEntity|undefined = this.users.find(user => user.email === userInput.email);
    return findUser;
  }
  
}

export { InMemoryUserRepository }
import { UserEntity } from "../entities/UserEntity";
import { UserRepositoryInterface } from "../provider/repositories/userRepository/UserRepositoryInterface";

class InMemoryUserRepository implements UserRepositoryInterface {
  getOneUser(): UserEntity {
    throw new Error("Method not implemented.");
  }
  
}

export { InMemoryUserRepository }
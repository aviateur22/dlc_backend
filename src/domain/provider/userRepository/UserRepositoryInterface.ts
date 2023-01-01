import { UserEntity } from "../../entities/UserEntity";
import { UserInputInterface } from "../../inputs/user/UserInputInterface";

/**
 * Interface UserRepository
 */
interface UserRepositoryInterface {
  /**
   * Récupération user
   * @param {UserInputInterface} user 
   */
  getOneUser(user: UserInputInterface): UserEntity|undefined
}

export { UserRepositoryInterface }
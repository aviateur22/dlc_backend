import { UserEntity } from "../../../entities/UserEntity";

/**
 * Interface UserRepository
 */
interface UserRepositoryInterface {
  getOneUser(): UserEntity
}

export { UserRepositoryInterface }
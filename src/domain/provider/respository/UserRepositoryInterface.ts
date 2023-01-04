import { UserModel } from "../../../infra/repositories/models/UserModel";

/**
 * Interface UserRepository
 */
interface UserRepositoryInterface {
  /**
   * Initialisation
   */
  init(): Promise<void>

  /**
   * Ajout d'un utilisateur
   * @param {UserBaseInterface} user
   * @returns {UserModel|null} 
   */
  addUser(user: UserBaseInterface): Promise<UserModel|null>
  
  /**
   * Récupération user
   * @param {UserBaseInterface} user 
   * @returns {UserModel|null}
   */
  getOneUser(user: UserBaseInterface): Promise<UserModel|null>
}

export { UserRepositoryInterface }
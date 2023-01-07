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
  registerUser(user: UserRegisterInterface): Promise<UserModelInterface|null>
  
  /**
   * Récupération user
   * @param {UserBaseInterface} user 
   * @returns {UserModel|null}
   */
  getOneUser(user: UserInterface): Promise<UserModelInterface|null>
}

export { UserRepositoryInterface }
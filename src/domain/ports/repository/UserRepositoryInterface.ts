import { UserModel } from "../../../infra/adapters/repositories/models/UserModel";

/**
 * Interface UserRepository
 */
interface UserRepositoryInterface {
  
  /**
   * Ajout d'un utilisateur
   * @param {UserBaseInterface} user
   * @returns {UserModel|null} 
   */
  save(user: UserRegisterInterface): Promise<UserModel|null>;
  
  /**
   * Récupération user
   * @param {number} id 
   * @returns {UserModel|null}
   */
  findOne(id: number): Promise<UserModel|null>;

  /**
   * Récupéaration user par son email
   * @param email
   */
  findOneByEmail(email: string): Promise<UserModel|null>;

  /**
   * Supprssion de tous les utilisateurs
   */
  deleteAll(): Promise<void>;
}

export { UserRepositoryInterface }
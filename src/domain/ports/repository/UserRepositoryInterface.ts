/**
 * Interface UserRepository
 */
interface UserRepositoryInterface {
  
  /**
   * Ajout d'un utilisateur
   * @param {UserBaseInterface} user
   * @returns {UserModel|null} 
   */
  save(user: UserRegisterInterface): Promise<UserModelInterface|null>;
  
  /**
   * Récupération user
   * @param {string} email 
   * @returns {UserModel|null}
   */
  findOne(email: string): Promise<UserModelInterface|null>;

  /**
   * Supprssion de tous les utilisateurs
   */
  deleteAll(): Promise<void>;
}

export { UserRepositoryInterface }
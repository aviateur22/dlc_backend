/**
 * Interface UserRepository
 */
interface UserRepositoryInterface extends RepositoryBaseInterface {
  
  /**
   * Ajout d'un utilisateur
   * @param {UserBaseInterface} user
   * @returns {UserModel|null} 
   */
  save(user: UserRegisterInterface): Promise<UserModelInterface|null>;
  
  /**
   * Récupération user
   * @param {UserBaseInterface} user 
   * @returns {UserModel|null}
   */
  findOne(user: UserInterface): Promise<UserModelInterface|null>;

  /**
   * Supprssion de tous les utilisateurs
   */
  deleteAll(): Promise<void>;
}

export { UserRepositoryInterface }
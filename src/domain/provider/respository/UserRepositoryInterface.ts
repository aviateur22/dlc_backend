import { UserEntity } from "../../entities/UserEntity";
import { UserInputInterface } from "../../ports/input/UserInputInterface";

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
   * @param {UserInputInterface} userInput
   * @returns {UserEntity} 
   */
  addUser(userInput: UserInputInterface): Promise<UserEntity>
  
  /**
   * Récupération user
   * @param {UserInputInterface} userInput 
   * @returns {UserEntity}
   */
  getOneUser(userInput: UserInputInterface): Promise<UserEntity|undefined>
}

export { UserRepositoryInterface }
import {UserModel} from '../models/UserModel'
import {PasswordMissingException} from "../../../../exceptions/PasswordMissingException";
import {UserRepositoryInterface} from "../../../../domain/ports/repository/UserRepositoryInterface";

class InMemoryUserRepository implements UserRepositoryInterface {
  /**
   * PasswordSecurity
   */
  protected passwordSecurity?: PasswordSecurityInterface;

  /**
   * Array<UserEntity>
   */
  protected users: Array<UserModel> = [];

  constructor(passwordSecurity?: PasswordSecurityInterface) {
    if(passwordSecurity) {
      this.passwordSecurity = passwordSecurity;
    }
  }

  /**
   * 
   * @returns {void}
   */
  private async addUserInArray():Promise<void> {
    /**
     * User pour inserrer dans Array<UserEntity>
     */
    const user: UserModel = {
      name: 'cyrille',
      email: 'aviateur22@hotmail.fr',
      password: 'affirmer2011',
      userImageUrl: 'wwww'
    }

    let copyUser = {
      ...user
    }

    if(!this.passwordSecurity) {
      return;
    }    
    copyUser.password = await this.passwordSecurity.setPasswordSecurity(user.password);  

    // Mise dans tableau
    this.users.push(copyUser);
  }

  /**
   * Ajout d'un utilisateur
   * @param {UserRegisterInterface} user - Utilisateur a enregistrer
   * @returns {UserOutputInterface}
   */
  async save(user: UserRegisterInterface): Promise<UserModelInterface|null> {

    if(!this.passwordSecurity) {
      throw new PasswordMissingException('');
    }

    const userModel: UserModel = {
      name: '',
      email: user.email,
      password: await this.passwordSecurity.setPasswordSecurity(user.password),
      userImageUrl: 'wwww//default-url'
    }

    this.users.push(userModel);
    return userModel;
  }

  /**
   * Recherche d'un User
   * @param {UserInputInterface} userInput - Données utilisateur
   * @returns {UserEntity|null}
   */
  async findOne(userInput: UserInterface): Promise<UserModelInterface|null> {
    // Recherche loginUser
    const findUser: UserModel|undefined = this.users.find(user => user.email === userInput.email);

    if(!findUser) {
      return null;
    }

    return findUser;
  }

  /**
   * Suppression de tous les utilisateurs
   */
  async deleteAll(): Promise<void> {
    this.users = [];
  }
  
}

export { InMemoryUserRepository }
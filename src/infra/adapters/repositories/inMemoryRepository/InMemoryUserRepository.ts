import {UserModel} from '../../../infra/repositories/models/UserModel'
import {PasswordMissingException} from "../../../exceptions/PasswordMissingException";
import {UserRepositoryInterface} from "../../../domain/ports/repository/UserRepositoryInterface";

class InMemoryUserRepository implements UserRepositoryInterface {
  /**
   * PasswordSecurity
   */
  protected passwordSecurity: PasswordSecurityInterface;

  /**
   * Array<UserEntity>
   */
  protected users: Array<UserModel> = [];

  /**
   * User pour inserrer dans Array<UserEntity>
   */
  protected user: UserModel = {
    name: 'cyrille',
    email: 'aviateur22@hotmail.fr',
    password: 'affirmer2011',
    userImageUrl: 'wwww'
  }

  constructor(passwordSecurity: PasswordSecurityInterface) {
    this.passwordSecurity = passwordSecurity;
  }
  
  /**
   * Initialisation données
   */
  public async init(): Promise<void> {
    // Réinitialise users
    this.users = [];

    let copyUser = {
      ...this.user
    }

    copyUser.password = await this.passwordSecurity.setPasswordSecurity(this.user.password);  

    // Mise dans tableau
    this.users.push(copyUser);
  }

  /**
   * Ajout d'un utilisateur
   * @param {string} email 
   * @param {string} password 
   * @returns {UserOutputInterface}
   */
  async registerUser(user: UserRegisterInterface): Promise<UserModelInterface|null> {
    
    if(!user.password) {
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
   * 
   * @param {UserInputInterface} userInput - Données utilisateur
   * @returns {UserEntity|undefined}
   */
  async getOneUser(userInput: UserInterface): Promise<UserModelInterface|null> {
    await this.init();

    // Recherche loginUser
    const findUser: UserModel|undefined = this.users.find(user => user.email === userInput.email);

    if(!findUser) {
      return null;
    }

    return findUser;
  }
  
}

export { InMemoryUserRepository }
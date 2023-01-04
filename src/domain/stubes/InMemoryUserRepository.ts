import { UserEntity } from "../entities/UserEntity";
import { PasswordMissingException } from "../exceptions/PasswordMissingException";
import { UserInputInterface } from "../ports/input/UserInputInterface";
import { UserRepositoryInterface } from "../provider/respository/UserRepositoryInterface";

class InMemoryUserRepository implements UserRepositoryInterface {
  /**
   * PasswordSecurity
   */
  protected passwordSecurity: PasswordSecurityInterface;

  /**
   * Array<UserEntity>
   */
  protected users: Array<UserEntity> = [];

  /**
   * User pour inserrer dans Array<UserEntity>
   */
  protected user: UserEntity = {
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
  async addUser(userInput: UserInputInterface): Promise<UserEntity> {
    
    if(!userInput.password) {
      throw new PasswordMissingException('');
    }

    const user: UserEntity = {
      name: undefined,
      email: userInput.email,
      password: await this.passwordSecurity.setPasswordSecurity(userInput.password),
      userImageUrl: 'wwww//default-adress'
    }
    this.users.push(user);

    return user;
  }

  /**
   * 
   * @param {UserInputInterface} userInput - Données utilisateur
   * @returns {UserEntity|undefined}
   */
  async getOneUser(userInput: UserInputInterface): Promise<UserEntity|undefined> {
    await this.init();

    // Recherche loginUser
    const findUser: UserEntity|undefined = this.users.find(user => user.email === userInput.email);

    if(!findUser) {
      return undefined;
    }

    return findUser;
  }
  
}

export { InMemoryUserRepository }
import { UserModel} from '../models/UserModel'
import { PasswordMissingException } from "../../../../exceptions/PasswordMissingException";
import { UserRepositoryInterface } from "../../../../domain/ports/repository/UserRepositoryInterface";
import { PasswordSecurityService } from '../../../../services/instanciateService/PasswordSecurity';

class InMemoryUserRepository implements UserRepositoryInterface {
  /**
   * PasswordSecurity
   */
  protected passwordSecurity?: PasswordSecurityInterface = PasswordSecurityService.getPasswordSecurity();

  /**
   * Array<UserEntity>
   */
  protected users: Array<UserModel> = [];

  /**
   * 
   * @returns {void}
   */
  private async addUserInArray():Promise<void> {
    /**
     * User pour inserrer dans Array<UserEntity>
     */
    const user: UserModel = {
      id: 1,
      name: 'cyrille',
      email: 'aviateur22@hotmail.fr',
      password: 'affirmer2011',
      userImageUrl: 'wwww',
      createdAt: new Date('2023-01-20'),
      updatedAt: new Date('2023-01-20')
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
  async save(user: UserRegisterInterface): Promise<UserModel|null> {

    // id
    const id = this.users.length === 0 ? 1 : Math.max(...this.users.map(x=>x.id)) + 1;

    if(!this.passwordSecurity) {
      throw new PasswordMissingException('');
    }

    const userModel: UserModel = {
      id,
      name: '',
      email: user.email,
      password: await this.passwordSecurity.setPasswordSecurity(user.password),
      userImageUrl: 'wwww//default-url',
      createdAt: new Date('2023-01-20'),
      updatedAt: new Date('2023-01-20')
    }

    this.users.push(userModel);
    return userModel;
  }

  /**
   * Recherche d'un User
   * @param {string} email - Email utilisateur
   * @returns {UserEntity|null}
   */
  async findOneByEmail(email: string): Promise<UserModel|null> {
    // Recherche loginUser
    const findUser: UserModel|undefined = this.users.find(user => user.email === email);

    if(!findUser) {
      return null;
    }

    return findUser;
  }

  /**
   * Recherche d'un User
   * @param {number} userId - Id utilisateur
   * @returns {UserEntity|null}
   */
  async findOne(userId: number): Promise<UserModel|null> {
    // Recherche loginUser
    const findUser: UserModel|undefined = this.users.find(user => user.id === userId);

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
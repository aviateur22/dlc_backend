import { PasswordMissingException } from "../exceptions/PasswordMissingException";
import { EmailFindException } from "../exceptions/EmailFindException";
import { UserRepositoryInterface } from "../provider/respository/UserRepositoryInterface";
import { PasswordNotIdenticalException } from "../exceptions/PasswordNotIdenticalException";
import { UserFactory } from "../factories/UserFactory";

/**
 * Enregistrement utilisateur
 */
class RegisterUser {
  /**
   * Implmentation UserRegister
   */
  user: UserRegisterInterface;

  /**
   * Implmentation Repository
   */
  userRepository: UserRepositoryInterface;

  /**
   * Implmentation Password Sécurité
   */
  passwordSecurity: PasswordSecurityInterface;

  constructor(
    user: UserRegisterInterface,
    userRepository: UserRepositoryInterface,
    passwordSecurity: PasswordSecurityInterface,
    ) {
    this.user = user;
    this.userRepository = userRepository;
    this.passwordSecurity = passwordSecurity;
  }

  /**
   * Inscription nouveau client
   */
  async register(): Promise<UserEntityInterface|null> {
    if(!this.user.password || !this.user.confirmPassword) {
      throw new PasswordMissingException('');
    }    

    if(this.user.password !== this.user.confirmPassword) {
      throw new PasswordNotIdenticalException('')
    }

    if(await this.userRepository.getOneUser(this.user)){
      throw new EmailFindException('');
    }

    const addUser = await this.userRepository.addUser(this.user);

    if(!addUser){
      throw new Error('echec enregistrement');
    }
    
    // Map le résultat 
    return UserFactory.getUserEntity(addUser.email, addUser.name, addUser.userImageUrl);
  }
}
export {RegisterUser}
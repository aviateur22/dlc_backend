import { PasswordMissingException } from "../../exceptions/PasswordMissingException";
import { EmailFindException } from "../../exceptions/EmailFindException";
import { UserRepositoryInterface } from "../ports/repository/UserRepositoryInterface";
import { PasswordNotIdenticalException } from "../../exceptions/PasswordNotIdenticalException";
import { UserFactory } from "../../factories/UserFactory";
import { Repository } from "../../helpers/repositories/Repository";

/**
 * Enregistrement utilisateur
 */
class RegisterUserUseCase {  
  /**
   * Implmentation Repository
   */
  userRepository: UserRepositoryInterface;

  /**
   * Implmentation Password Sécurité
   */
  passwordSecurity: PasswordSecurityInterface;

  constructor(
    repositories: Repository,
    passwordSecurity: PasswordSecurityInterface,
    ) {
    this.userRepository = repositories.userRepository;
    this.passwordSecurity = passwordSecurity;
  }

  /**
   * Inscription nouveau client
   * @param {UserRegisterInterface} user - Personne a inscrire
   * @returns {UserEntityInterface} 
   */
  async execute(user: UserRegisterInterface): Promise<UserEntityInterface|null> {
    if(!user.password || !user.confirmPassword) {
      throw new PasswordMissingException('');
    }    

    if(user.password !== user.confirmPassword) {
      throw new PasswordNotIdenticalException('')
    }

    if(await this.userRepository.findOne(user)){
      throw new EmailFindException('');
    }

    const addUser = await this.userRepository.save(user);

    if(!addUser){
      throw new Error('echec enregistrement');
    }
    
    // Map le résultat 
    return UserFactory.getUserEntity(addUser.email, addUser.name, addUser.userImageUrl);
  }
}
export { RegisterUserUseCase }
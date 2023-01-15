import { PasswordMissingException } from "../../exceptions/PasswordMissingException";
import { EmailFindException } from "../../exceptions/EmailFindException";
import { UserRepositoryInterface } from "../ports/repository/UserRepositoryInterface";
import { PasswordNotIdenticalException } from "../../exceptions/PasswordNotIdenticalException";
import { Repository } from "../../helpers/repositories/Repository";
import { UserEntity } from "../entities/UserEntity";
import { UserEntityMapper } from "../dtos/UserEntityMapper";

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
  async execute(user: UserRegisterInterface): Promise<UserEntity|null> {
    if(!user.password || !user.confirmPassword) {
      throw new PasswordMissingException('');
    }    

    if(user.password !== user.confirmPassword) {
      throw new PasswordNotIdenticalException('')
    }

    if(await this.userRepository.findOneByEmail(user.email)){
      throw new EmailFindException('');
    }

    const addUser = await this.userRepository.save(user);

    if(!addUser){
      throw new Error('echec enregistrement');
    }
        
    return UserEntityMapper.userEntity(addUser);
  }
}
export { RegisterUserUseCase }
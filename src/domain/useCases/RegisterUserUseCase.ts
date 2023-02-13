import { PasswordMissingException } from "../../exceptions/PasswordMissingException";
import { EmailFindException } from "../../exceptions/EmailFindException";
import { PasswordNotIdenticalException } from "../../exceptions/PasswordNotIdenticalException";
import { UserEntity } from "../entities/UserEntity";
import { UserEntityMapper } from "../dtos/UserEntityMapper";
import { Repository } from "../../services/instanciateService/Repository";

/**
 * Enregistrement utilisateur
 */
class RegisterUserUseCase {

  /**
   * userRepository
   */
  private userRepository = Repository.getRepositories().userRepository;

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

import { UserNotFindException } from "../../exceptions/UserNotFindException";
import { PasswordInvalidException } from "../../exceptions/PasswordInvalidException";
import { PasswordMissingException } from "../../exceptions/PasswordMissingException";
import { UserEntity } from "../entities/UserEntity";
import { UserEntityMapper } from "../dtos/UserEntityMapper";
import { Repository } from "../../services/instanciateService/Repository";
import { PasswordSecurityService } from "../../services/instanciateService/PasswordSecurity";

/**
 * Usecase Connexion client
 */
class LoginUserUseCase {

  /**
   * userRepository
   */
    private userRepository = Repository.getRepositories().userRepository;

    /**
     * 
     */
    private passwordSecurity = PasswordSecurityService.getPasswordSecurity();

    /**
     * productRepository
     */
    private productRepository = Repository.getRepositories().productRepository;
  
    /**
     * userProductRepository
     */
    private userProductRepository = Repository.getRepositories().userProductRepository;

  /**
   * Exécution du useCase LoginUser
   * @returns {UserReponseModelInterface}
   */
  async execute(user: UserConnectInterface): Promise<UserEntity|null> {

    // Mot de passe manquant
    if(!user.password) {
      throw new PasswordMissingException('Le mot de passe est obligatoire');
    }

    // Récupération utilisateur en base de données
    const findUser = await this.userRepository.findOneByEmail(user.email);
    
    if(!findUser) {
      throw new UserNotFindException('Utilisateur inconnu');
    }
    
    const isPasswordValid = await this.passwordSecurity.comparePassword(findUser.password, user.password);
    
    if(!isPasswordValid) {
      throw new PasswordInvalidException('')
    }
    
    return UserEntityMapper.userEntity(findUser);
  }
}

export { LoginUserUseCase }
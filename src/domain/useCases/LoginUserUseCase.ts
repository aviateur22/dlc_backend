import { UserRepositoryInterface } from "../ports/repository/UserRepositoryInterface";
import { UserNotFindException } from "../../exceptions/UserNotFindException";
import { PasswordInvalidException } from "../../exceptions/PasswordInvalidException";
import { PasswordMissingException } from "../../exceptions/PasswordMissingException";
import { Repository } from "../../helpers/repositories/Repository";
import { UserEntity } from "../entities/UserEntity";
import { UserEntityMapper } from "../dtos/UserEntityMapper";

/**
 * Usecase Connexion client
 */
class LoginUserUseCase {
  
  /**
   * Interface Repository
   */
  protected userRepository: UserRepositoryInterface;

  /**
   * Implémentation
   */
  protected passwordSecurity: PasswordSecurityInterface
  
  constructor(
    repositories: Repository,
    passwordSecurity: PasswordSecurityInterface
    ) {
    this.userRepository = repositories.userRepository;
    this.passwordSecurity = passwordSecurity;
  }

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
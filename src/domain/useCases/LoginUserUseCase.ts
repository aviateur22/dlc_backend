import { UserRepositoryInterface } from "../ports/repository/UserRepositoryInterface";
import { UserNotFindException } from "../../exceptions/UserNotFindException";
import { PasswordInvalidException } from "../../exceptions/PasswordInvalidException";
import { PasswordMissingException } from "../../exceptions/PasswordMissingException";
import { UserFactory } from "../../factories/UserFactory";

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
    userRepository: UserRepositoryInterface,
    passwordSecurity: PasswordSecurityInterface
    ) {
    this.userRepository = userRepository;
    this.passwordSecurity = passwordSecurity;
  }

  /**
   * Exécution du useCase LoginUser
   * @returns {UserReponseModelInterface}
   */
  async execute(user: UserInterface): Promise<UserEntity|null> {

    // Mot de passe manquant
    if(!user.password) {
      throw new PasswordMissingException('Le mot de passe est obligatoire');
    }

    // Récupération utilisateur en base de données
    const findUser = await this.userRepository.findOne(user);
    
    if(!findUser) {
      throw new UserNotFindException('Utilisateur inconnu');
    }
    
    const isPasswordValid = await this.passwordSecurity.comparePassword(findUser.password, user.password);
    
    if(!isPasswordValid) {
      throw new PasswordInvalidException('')
    }

    // Map le résultat 
    return UserFactory.getUserEntity(findUser.email, findUser.name, findUser.userImageUrl);
  }
}

export { LoginUserUseCase }
import { UserRepositoryInterface } from "../ports/repository/UserRepositoryInterface";
import { UserNotFindException } from "../../exceptions/UserNotFindException";
import { PasswordInvalidException } from "../../exceptions/PasswordInvalidException";
import { PasswordMissingException } from "../../exceptions/PasswordMissingException";
import { UserFactory } from "../../factories/UserFactory";

/**
 * Usecase Connexion client
 */
class LoginUser {
  /**
   * Login user
   */
  protected user: UserInterface;

  /**
   * Interface Repository
   */
  protected userRepository: UserRepositoryInterface;

  /**
   * Implémentation
   */
  protected passwordSecurity: PasswordSecurityInterface
  
  constructor(
    user: UserInterface,
    userRepository: UserRepositoryInterface,
    passwordSecurity: PasswordSecurityInterface
    ) {
    this.user = user;
    this.userRepository = userRepository;
    this.passwordSecurity = passwordSecurity;
  }

  /**
   * Exécution du useCase LoginUser
   * @returns {UserReponseModelInterface}
   */
  async findLoginUser(): Promise<UserEntity|null> {

    // Mot de passe manquant
    if(!this.user.password) {
      throw new PasswordMissingException('Le mot de passe n\'est est obligatoire');
    }

    // Récupération utilisateur en base de données
    const findLoginUser = await this.userRepository.getOneUser(this.user);
    
    if(!findLoginUser) {
      throw new UserNotFindException('Utilisateur inconnu');
    }
    
    const isPasswordValid = await this.passwordSecurity.comparePassword(findLoginUser.password, this.user.password);
    
    if(!isPasswordValid) {
      throw new PasswordInvalidException('')
    }

    // Map le résultat 
    return UserFactory.getUserEntity(findLoginUser.email, findLoginUser.name, findLoginUser.userImageUrl);
  }
}

export { LoginUser }
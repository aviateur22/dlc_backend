import { UserInputInterface } from "../inputs/user/UserInputInterface";
import { UserEntity } from "../entities/UserEntity";
import { UserRepositoryInterface } from "../provider/userRepository/UserRepositoryInterface";
import { UserDto } from "../dto/UserDto";
import { UserNotFindException } from "../exception/UserNotFindException";
import { PasswordInvalidException } from "../exception/PasswordInvalidException";
import { PasswordMissingException } from "../exception/PasswordMissingException";
import { ApiFactory } from "../factories/ApiFactory";

/**
 * Usecase Connexion client
 */
class LoginUser {
  protected userInputModel: UserInputInterface;
  protected userEntity: UserEntity | undefined;
  protected userRepository: UserRepositoryInterface;
  protected passwordSecurity: PasswordSecurityInterface
  protected userOutputModel: UserOutputInterface;

  constructor(
    userInputModel: UserInputInterface,
    userRepository: UserRepositoryInterface,
    passwordSecurity: PasswordSecurityInterface,
    userOutputModel: UserOutputInterface
    ) {
    this.userInputModel = userInputModel;
    this.userRepository = userRepository;
    this.passwordSecurity = passwordSecurity;
    this.userOutputModel = userOutputModel;
  }

  /**
   * Exécution du useCase LoginUser
   * @returns {UserReponseModelInterface}
   */
  async findLoginUser(): Promise<UserOutputInterface|null> {

    // Mot de passe manquant
    if(!this.userInputModel.password) {
      throw new PasswordMissingException('Le mot de passe n\'est est obligatoire');
    }

    // Récupération utilisateur en base de données
    const findLoginUser = await this.userRepository.getOneUser(this.userInputModel);
    
    if(!findLoginUser) {
      throw new UserNotFindException('Utilisateur inconnu');
    }
    
    const isPasswordValid = await this.passwordSecurity.comparePassword(findLoginUser.password, this.userInputModel.password);
    
    if(!isPasswordValid) {
      throw new PasswordInvalidException('')
    }

    // Map le résultat 
    return new UserDto(findLoginUser, this.userOutputModel).userDto();
  }
}

export { LoginUser }
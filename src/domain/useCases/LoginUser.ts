import { UserInputInterface } from "../ports/input/UserInputInterface";
import { UserEntity } from "../entities/UserEntity";
import { UserRepositoryInterface } from "../provider/respository/UserRepositoryInterface";
import { UserMapper } from "../mappers/UserMapper";
import { UserNotFindException } from "../exceptions/UserNotFindException";
import { PasswordInvalidException } from "../exceptions/PasswordInvalidException";
import { PasswordMissingException } from "../exceptions/PasswordMissingException";

/**
 * Usecase Connexion client
 */
class LoginUser {
  protected userInputModel: UserInputInterface;
  protected userEntity: UserEntity | undefined;
  protected userRepository: UserRepositoryInterface;
  protected passwordSecurity: PasswordSecurityInterface
  protected userMapper: UserMapper;

  constructor(
    userInputModel: UserInputInterface,
    userRepository: UserRepositoryInterface,
    passwordSecurity: PasswordSecurityInterface,
    userMapper: UserMapper
    ) {
    this.userInputModel = userInputModel;
    this.userRepository = userRepository;
    this.passwordSecurity = passwordSecurity;
    this.userMapper = userMapper;
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
    return this.userMapper.userDto(findLoginUser);
  }
}

export { LoginUser }
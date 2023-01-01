import { UserInputInterface } from "../inputs/user/UserInputInterface";
import { UserEntity } from "../entities/UserEntity";
import { UserRepositoryInterface } from "../provider/userRepository/UserRepositoryInterface";
import { UserDto } from "../dto/UserDto";

/**
 * Usecase Connexion client
 */
class LoginUser {
  protected userInputModel: UserInputInterface;
  protected userEntity: UserEntity | undefined;
  protected userRepository: UserRepositoryInterface;

  constructor(userInputModel: UserInputInterface, userRepository: UserRepositoryInterface) {
    this.userInputModel = userInputModel;
    this.userRepository = userRepository;
  }

  /**
   * Exécution du useCase LoginUser
   * @returns {UserReponseModelInterface}
   */
  findLoginUser(): UserOutputInterface|null {

    // Récupération utilisateur en base de données
    const findLoginUser = this.userRepository.getOneUser(this.userInputModel);
    
    if(!findLoginUser) {
      return null;
    }

    // Map le résultat 
    return new UserDto(findLoginUser).userDto();
  }
}

export { LoginUser }
import { UserInputInterface } from "../inputs/user/UserInputInterface";
import { UserEntity } from "../entities/UserEntity";
import { ResponseFactory } from "../factories/ResponseFactory";
import { UserRepositoryInterface } from "../provider/repositories/userRepository/UserRepositoryInterface";

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
  execute(): UserOutputInterface {
    this.userEntity = new UserEntity('', '', '', '');
    const userModelResponse = ResponseFactory.getUserResponseModel(this.userEntity.email, this.userEntity.name, this.userEntity.userImageUrl);
    
    return userModelResponse;
  }
}

export { LoginUser }
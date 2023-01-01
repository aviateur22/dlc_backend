import { UserInputInterface } from "../inputs/user/UserInputInterface";
import { UserInputModel } from "../inputs/user/UserInputModel";
import { UserEntity } from "../entities/UserEntity";
import { ResponseFactory } from "../factories/ResponseFactory";
import { LoginUserOutput } from "../outputs/LoginUserOutput";

/**
 * Usecase Connexion client
 */
class LoginUser {
  protected userInputModel: UserInputModel;
  protected userLoginResponse: LoginUserOutput | undefined;
  protected userEntity: UserEntity | undefined;

  constructor(userInputModel: UserInputInterface) {
    this.userInputModel = userInputModel;
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
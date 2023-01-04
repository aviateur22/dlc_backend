import { UserEntity } from "../entities/UserEntity";

class UserMapper {

  protected userOutputModel: UserOutputInterface;


  constructor(userOutputModel: UserOutputInterface) {
    this.userOutputModel = userOutputModel;
  }

  /**
   * Mappe UserEntity à UserOutputInterface
   * @param user 
   * @returns 
   */
  userDto(user: UserEntity): UserOutputInterface {

    this.userOutputModel.email = user.email;
    this.userOutputModel.name = user.name;
    this.userOutputModel.userImageUrl = user.userImageUrl;

    return this.userOutputModel;
  }
}

export { UserMapper }
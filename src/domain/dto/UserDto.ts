import { UserEntity } from "../entities/UserEntity";

class UserDto {

  protected user: UserEntity;
  protected userOutputModel: UserOutputInterface;

  constructor(user: UserEntity, userOutputModel: UserOutputInterface ) {
    this.user = user;
    this.userOutputModel = userOutputModel;
  }

  userDto(): UserOutputInterface {
    this.userOutputModel.email = this.user.email;
    this.userOutputModel.name = this.user.name;
    this.userOutputModel.userImageUrl = this.user.userImageUrl;

    return this.userOutputModel;
  }
}

export { UserDto }
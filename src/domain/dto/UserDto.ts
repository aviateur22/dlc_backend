import { UserEntity } from "../entities/UserEntity";

class UserDto {

  protected user: UserEntity;

  constructor(user: UserEntity) {
    this.user = user;
  }

  userDto(): UserOutputInterface {
    const userOutput: UserOutputInterface = {
      name: this.user.name,
      email: this.user.email,
      userImageUrl: this.user.userImageUrl
    }
    return userOutput;
  }
}

export { UserDto }
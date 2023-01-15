import { UserModel } from "../../infra/adapters/repositories/models/UserModel";
import { UserEntity } from "../entities/UserEntity";

/**
 * Renvoie un UserEntity
 */
class UserEntityMapper {
  static userEntity(user: UserModel) {
    const userImageUrl = user.userImageUrl !== null ? user.userImageUrl : '';
    const userName = user.name !== null ? user.name : '';

    return new UserEntity(
      user.id,
      user.email,
      userName,
      userImageUrl,
      user.createdAt,
      user.updatedAt
    )
  }
}

export { UserEntityMapper }
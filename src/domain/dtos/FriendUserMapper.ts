import { FriendUserModel } from "../../infra/adapters/repositories/models/FriendUserModel";
import { FriendUserEntity } from "../entities/FriendUserEntity";

/**
 * 
 */
class FriendUserMapper {
  /**
   * Renvoie un FriendUserEntity
   * @param { FriendUserModel } friendUser 
   * @returns 
   */
  static FriendUserEntity(friendUser: FriendUserModel) {    
    return new FriendUserEntity(
      friendUser.id, 
      friendUser.userId, 
      friendUser.friendId,
      friendUser.updateProduct,
      friendUser.deleteProduct,
      friendUser.createdDate, 
      friendUser.updatedDate
      )
  }
}

export { FriendUserMapper }
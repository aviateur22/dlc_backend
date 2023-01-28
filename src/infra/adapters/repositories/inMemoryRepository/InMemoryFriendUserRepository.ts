import { FriendUserRepositoryInterface } from "../../../../domain/ports/repository/FriendUserRepositoryInterface";
import { FriendUserModel } from "../models/FriendUserModel";

class InMemoryFriendUserRepository implements FriendUserRepositoryInterface {

  // Array of FriendUser
  private friendUsers: Array<FriendUserModel> = [];

  /**
   * Sauvegarde de 1 Frienduser
   * @param friendUser 
   */
  save(friendUser: AddFriendUserInterface): FriendUserModel {
    // Recherche id 
    const id = this.friendUsers.length === 0 ? 1 : Math.max(...this.friendUsers.map(x=>x.id)) + 1;
    
    // Ajout FriendUser
    const addFriendUser: FriendUserModel = new FriendUserModel(
      id,
      friendUser.userId,
      friendUser.friendId,
      friendUser.updateProduct,
      friendUser.deleteProduct,
      new Date(),
      new Date()
    );

    this.friendUsers.push(addFriendUser);
    return addFriendUser;
  }

  /**
   * Recherche de 1 FriendUSer
   * @param friendUser 
   */
  findOne(friendUser: FindFriendUserInterface): FriendUserModel|null {
    const findFiendUser = this.friendUsers.find(x=>x.friendId === friendUser.friendId && x.userId === friendUser.userId);

    if(findFiendUser === undefined) {
      return null;
    }

    return findFiendUser;
  }

  /**
   * Suppression d'un FriendUser
   * @param friendUser 
   */
  deleteOne(friendUser: DeleteFriendUserInterface): void {
    throw new Error('Method notimplemented.');
  };

  /**
   * Suppression de tous les FriendUsers
   */
  deleteAll(): void {
    this.friendUsers = [];
  }  
}

export { InMemoryFriendUserRepository }
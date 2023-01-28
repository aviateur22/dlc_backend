import { FriendUserModel } from "../../../infra/adapters/repositories/models/FriendUserModel";

/**
 * Interface FriendUser
 */
interface FriendUserRepositoryInterface {
  /**
   * Ajout d'une liaison Friend-user
   */
  save(friendUser: AddFriendUserInterface): FriendUserModel;

  /**
   * Recherche d'un FriendUser
   * @param friendUser 
   */
  findOne(friendUser: FindFriendUserInterface): FriendUserModel|null;

  /**
   * Suppression d'un FriendUser
   */
  deleteOne(friendUser: DeleteFriendUserInterface): void;

  /**
   * Supprime toutes les entrées
   */
  deleteAll(): void;
}

export { FriendUserRepositoryInterface }
/**
 * Model FriendUser
 */
class FriendUserModel {

  id: number;
  userId: number;
  friendId: number;
  updateProduct: boolean;
  deleteProduct: boolean;  
  createdDate: Date;
  updatedDate: Date;

  constructor(
    id: number, 
    userId: number, 
    friendId: number, 
    updateProduct: boolean, 
    deleteProduct: 
    boolean , 
    createdDate: Date, 
    updatedDate: Date
    ) {
    this.id = id;
    this.userId = userId;
    this.friendId = friendId;
    this.deleteProduct = deleteProduct;
    this.updateProduct = updateProduct;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }
}

export { FriendUserModel }
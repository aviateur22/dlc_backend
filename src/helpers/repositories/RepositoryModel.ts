import { FriendUserRepositoryInterface } from "../../domain/ports/repository/FriendUserRepositoryInterface";
import { ProductRepositoryInterface } from "../../domain/ports/repository/ProductRepositoryInterface";
import { UserProductRepositoryInterface } from "../../domain/ports/repository/UserProductRepositoryInterface";
import { UserRepositoryInterface } from "../../domain/ports/repository/UserRepositoryInterface";

/**
 * Repository 
 */
class RepositoryModel {

  /**
   * userRepository
   */
  readonly userRepository: UserRepositoryInterface;

  /**
   * productRepository
   */
  readonly productRepository: ProductRepositoryInterface;

  /**
   * UserProduct Repository
   */
  readonly userProductRepository: UserProductRepositoryInterface;

  /**
   * FriendUser Repository
   */
  readonly friendUserRepository: FriendUserRepositoryInterface;
  
  constructor(
    userRepository: UserRepositoryInterface, 
    productRepository:ProductRepositoryInterface,
    userProductRepository: UserProductRepositoryInterface,
    friendUserRepository: FriendUserRepositoryInterface
  ) {
    this.userRepository = userRepository;
    this.productRepository = productRepository;
    this.userProductRepository = userProductRepository;
    this.friendUserRepository = friendUserRepository;   
  }
}
export { RepositoryModel }
import { ProductRepositoryInterface } from "../../domain/ports/repository/ProductRepositoryInterface";
import { UserProductRepositoryInterface } from "../../domain/ports/repository/UserProductRepositoryInterface";
import { UserRepositoryInterface } from "../../domain/ports/repository/UserRepositoryInterface";

/**
 * Repository 
 */
class Repository {

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
  readonly userProductRepository: UserProductRepositoryInterface
  
  constructor(
    userRepository: UserRepositoryInterface, 
    productRepository:ProductRepositoryInterface,
    userProductRepository: UserProductRepositoryInterface
  ) {
    this.userRepository = userRepository;
    this.productRepository = productRepository;
    this.userProductRepository = userProductRepository;   
  }
}
export { Repository }
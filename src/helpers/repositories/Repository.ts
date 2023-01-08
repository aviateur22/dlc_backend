import { ProductRepositoryInterface } from "../../domain/ports/repository/ProductRepositoryInterface";
import { UserRepositoryInterface } from "../../domain/ports/repository/UserRepositoryInterface";

/**
 * Repository 
 */
class Repository {

  /**
   * userRepository
   */
  userRepository: UserRepositoryInterface;

  /**
   * productRepository
   */
  productRepository: ProductRepositoryInterface;
  
  constructor(userRepository: UserRepositoryInterface, productRepository:ProductRepositoryInterface) 
  {
    this.userRepository = userRepository;
    this.productRepository = productRepository    
  }
}
export { Repository }
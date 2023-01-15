import { UserNotFindException } from "../../exceptions/UserNotFindException";
import { Repository } from "../../helpers/repositories/Repository";
import { ProductEntityMapper } from "../dtos/ProductEntityMapper";
import { ProductEntity } from "../entities/ProductEntity";
import { ProductRepositoryInterface } from "../ports/repository/ProductRepositoryInterface";
import { UserRepositoryInterface } from "../ports/repository/UserRepositoryInterface";

/**
 * Ajout d'un produit
 */
class AddProductUseCase {

  /**
   * Repository USer
   */
  protected userRepository: UserRepositoryInterface;

  /**
   * Repository Product
   */
  protected productRepository: ProductRepositoryInterface;

  constructor(repositories: Repository) {
    this.userRepository = repositories.userRepository;
    this.productRepository = repositories.productRepository;

  }

  /**
   * Ajout d'un produit
   * @param {ProductInterface} product 
   * @returns {ProductEntity}
   */
  async execute(product: ProductAddInterface, userId: number): Promise<ProductEntity> {

    const findUser = await  this.userRepository.findOne(userId);

    if(!findUser) {
      throw new UserNotFindException('');
    }

    const saveProduct = await this.productRepository.save(product);

    return ProductEntityMapper.productEntity(saveProduct);
  }  
}
export {AddProductUseCase};
import { UserNotFindException } from "../../exceptions/UserNotFindException";
import { Repository } from "../../helpers/repositories/Repository";
import { ProductEntityMapper } from "../dtos/ProductEntityMapper";
import { ProductEntity } from "../entities/ProductEntity";
import { ProductRepositoryInterface } from "../ports/repository/ProductRepositoryInterface";
import { UserProductRepositoryInterface } from "../ports/repository/UserProductRepositoryInterface";
import { UserRepositoryInterface } from "../ports/repository/UserRepositoryInterface";

/**
 * Ajout d'un produit
 */
class AddProductUseCase {

  /**
   * Repository USer
   */
  protected readonly userRepository: UserRepositoryInterface;

  /**
   * Repository Product
   */
  protected readonly productRepository: ProductRepositoryInterface;

  /**
   * UserProduct Repository
   */
  protected readonly userProductRepository: UserProductRepositoryInterface;

  constructor(repositories: Repository) {
    this.userRepository = repositories.userRepository;
    this.productRepository = repositories.productRepository;
    this.userProductRepository = repositories.userProductRepository;

  }

  /**
   * Ajout d'un produit
   * @param {ProductInterface} product 
   * @returns {ProductEntity}
   */
  async execute(product: ProductAddInterface, userId: number): Promise<ProductEntity> {

    const findUser = await  this.userRepository.findOne(userId);

    if(!findUser) {
      throw new UserNotFindException();
    }

    // Ajout du produit 
    const saveProduct = await this.productRepository.save(product);

    // Ajout du userProduct
    const saveUserProduct = await this.userProductRepository.save({
      userId: userId,
      productId: saveProduct.id
    })

    return ProductEntityMapper.productEntity(saveProduct);
  }  
}
export {AddProductUseCase};
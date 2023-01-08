import { UserNotFindException } from "../../exceptions/UserNotFindException";
import { ProductFactory } from "../../factories/ProductFactory";
import { Repository } from "../../helpers/repositories/Repository";
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
   * @returns {ProductEnityInterface}
   */
  async execute(product: ProductAddInterface, user: UserEntityInterface): Promise<ProductEnityInterface> {

    const findUser = await  this.userRepository.findOne(user.email);

    if(!findUser) {
      throw new UserNotFindException('');
    }

    const saveProduct = await this.productRepository.save(product);
    return ProductFactory.getProductEntity(saveProduct.id);
  }  
}
export {AddProductUseCase};
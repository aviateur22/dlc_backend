import { UserNotFindException } from "../../exceptions/UserNotFindException";
import { Repository } from "../../services/instanciateService/Repository";
import { ProductEntityMapper } from "../dtos/ProductEntityMapper";
import { ProductEntity } from "../entities/ProductEntity";


/**
 * Ajout d'un produit
 */
class AddProductUseCase {

  /**
   * productRepository
   */
  private productRepository = Repository.getRepositories().productRepository;

  /**
   * productRepository
   */
  private userProductRepository = Repository.getRepositories().userProductRepository;

  /**
   * productRepository
   */
  private userRepository = Repository.getRepositories().userRepository;


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
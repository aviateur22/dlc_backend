import { ProductNotFindException } from "../../exceptions/ProductNotFindException";
import { UserNotFindException } from "../../exceptions/UserNotFindException";
import { UserProductNotMatchException } from "../../exceptions/UserProductNotMatchException";
import { UserProductModel } from "../../infra/adapters/repositories/models/UserProductModel";
import { Repository } from "../../services/instanciateService/Repository";

/**
 * Usecase Supression Produit
 */
class DeleteProductUseCase {

  /**
   * userRepository
   */
  private userRepository = Repository.getRepositories().userRepository;

  /**
   * productRepository
   */
  private productRepository = Repository.getRepositories().productRepository;

  /**
   * userProductRepository
   */
  private userProductRepository = Repository.getRepositories().userProductRepository;

  /**
   * Exécution du useCase LoginUser
   * @returns {void}
   */
  async execute(product: productDeleteInterface, userId: number): Promise<void> {
    
    // Vérification que l'utilisateur est trouvé
    const findUser = await this.userRepository.findOne(userId);

    if(!findUser) {
      throw new UserNotFindException();
    }

    // Recherche du produit
    const findProduct = await this.productRepository.findOne(product.id);

    if(!findProduct) {
      throw new ProductNotFindException('');
    }
    
    // Recherche rattachement User - Product
    const findUserProduct: UserProductModel|null = await this.userProductRepository.findOne(userId, product.id);

    if(!findUserProduct) {       
      throw new UserProductNotMatchException('');
    }
    
    // Suppression du produit
    await this.productRepository.deleteOne(product.id);
    await this.userProductRepository.deleteOne(userId, product.id);
  }
}

export { DeleteProductUseCase }
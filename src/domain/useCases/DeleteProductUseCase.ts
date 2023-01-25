import { ProductNotFindException } from "../../exceptions/ProductNotFindException";
import { UserNotFindException } from "../../exceptions/UserNotFindException";
import { UserProductNotMatchException } from "../../exceptions/UserProductNotMatchException";
import { Repository } from "../../helpers/repositories/Repository";
import { UserProductModel } from "../../infra/adapters/repositories/models/UserProductModel";
import { UserEntityMapper } from "../dtos/UserEntityMapper";
import { ProductRepositoryInterface } from "../ports/repository/ProductRepositoryInterface";
import { UserProductRepositoryInterface } from "../ports/repository/UserProductRepositoryInterface";
import { UserRepositoryInterface } from "../ports/repository/UserRepositoryInterface";

/**
 * Usecase Supression Produit
 */
class DeleteProductUseCase {
  
  /**
   * Interface Repository
   */
  protected userRepository: UserRepositoryInterface;

  /**
   * Product Repository
   */
  protected productRepository: ProductRepositoryInterface;

  /**
   * UserProduct repository
   */
  protected userProductRepository: UserProductRepositoryInterface;
  
  constructor(
    repositories: Repository
    ) {
    this.userRepository = repositories.userRepository;
    this.productRepository = repositories.productRepository;
    this.userProductRepository = repositories.userProductRepository;
    }

  /**
   * Exécution du useCase LoginUser
   * @returns {void}
   */
  async execute(product: productDeleteInterface, userId: number): Promise<void> {
    
    // Vérification que le produit appartient au user
    const findUser = await this.userRepository.findOne(userId);

    if(!findUser) {
      throw new UserNotFindException();
    }

    // Recherche du produit
    const findProduct = await this.productRepository.findOne(product.id);

    if(!findProduct) {
      throw new ProductNotFindException();
    }

    // Recherche rattachement User - Product
    const findUserProduct: UserProductModel|null = await this.userProductRepository.findOne(userId, product.id);

    if(!findUserProduct) {
      throw new UserProductNotMatchException();
    }
    
    // Suppression du produit
    await this.productRepository.deleteOne(product.id);
    await this.userProductRepository.deleteOne(userId, product.id);
    
  }
}

export { DeleteProductUseCase }
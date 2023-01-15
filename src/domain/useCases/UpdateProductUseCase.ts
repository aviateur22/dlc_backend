import { ProductNotFindException } from "../../exceptions/ProductNotFindException";
import { UserProductNotMatchException } from "../../exceptions/UserProductNotMatchException";
import { Repository } from "../../helpers/repositories/Repository";
import { UserProductModel } from "../../infra/adapters/repositories/models/UserProductModel";
import { ProductEntityMapper } from "../dtos/ProductEntityMapper";
import { ProductEntity } from "../entities/ProductEntity";
import { ProductRepositoryInterface } from "../ports/repository/ProductRepositoryInterface";
import { UserProductRepositoryInterface } from "../ports/repository/UserProductRepositoryInterface";
import { UserRepositoryInterface } from "../ports/repository/UserRepositoryInterface";

class UpdateProductUseCase {

  /**
   * User Repository
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

  constructor(repositories: Repository) {
    this.productRepository = repositories.productRepository;
    this.userRepository = repositories.userRepository;
    this.userProductRepository = repositories.userProductRepository;
  }

  async execute(product: productUpdateInterface, userId: number): Promise<ProductEntity> {

    // Vérification que le produit appartient au user
    const findUser = await this.userRepository.findOne(userId);

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

    // Update du produit
    const updateProduct = await this.productRepository.updateOne(product);

    return ProductEntityMapper.productEntity({
      id: updateProduct.id,
      productImageUrl: updateProduct.productImageUrl,
      createdDate: updateProduct.createdDate,
      updatedDate: updateProduct.updatedDate,
      openDate: updateProduct.openDate,
    });
  }
}
export { UpdateProductUseCase }
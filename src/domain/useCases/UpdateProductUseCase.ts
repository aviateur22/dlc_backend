import { ProductNotFindException } from "../../exceptions/ProductNotFindException";
import { UserNotFindException } from "../../exceptions/UserNotFindException";
import { UserProductNotMatchException } from "../../exceptions/UserProductNotMatchException";
import { UserProductModel } from "../../infra/adapters/repositories/models/UserProductModel";
import { Repository } from "../../services/instanciateService/Repository";
import { ProductEntityMapper } from "../dtos/ProductEntityMapper";
import { ProductEntity } from "../entities/ProductEntity";


class UpdateProductUseCase {

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

  async execute(product: productUpdateInterface, userId: number): Promise<ProductEntity> {

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
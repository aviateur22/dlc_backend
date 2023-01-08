import { ProductFactory } from "../../factories/ProductFactory";
import { ProductRepositoryInterface } from "../ports/repository/ProductRepositoryInterface";

/**
 * Ajout d'un produit
 */
class AddProductUseCase {

  /**
   * Repository
   */
  protected productRepository: ProductRepositoryInterface;


  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  /**
   * Ajout d'un produit
   * @param {ProductInterface} product 
   * @returns {ProductEnityInterface}
   */
  async addProduct(product: ProductAddInterface): Promise<ProductEnityInterface> {
    const saveProduct = await this.productRepository.save(product);
    return ProductFactory.getProductEntity(saveProduct.id, saveProduct.productImageUrl, saveProduct.openDate);
  }  
}
export {AddProductUseCase};
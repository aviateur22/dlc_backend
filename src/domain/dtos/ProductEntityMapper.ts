import { ProductModel } from "../../infra/adapters/repositories/models/ProductModel";
import { ProductEntity } from "../entities/ProductEntity";

/**
 * 
 */
class ProductEntityMapper {
  /**
   * Renvoie un ProductEntity
   * @param { ProductModel } product 
   * @returns 
   */
  static productEntity(product: ProductModel) {    
    return new ProductEntity(
      product.id, 
      product.productImageUrl, 
      product.openDate, 
      product.createdDate, 
      product.updatedDate
      )
  }
}

export { ProductEntityMapper }
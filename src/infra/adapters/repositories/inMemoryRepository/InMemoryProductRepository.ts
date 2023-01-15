import { ProductEntity } from "../../../../domain/entities/ProductEntity";
import { ProductRepositoryInterface } from "../../../../domain/ports/repository/ProductRepositoryInterface";
import { ProductModel } from "../models/ProductModel";

class InMemoryProductRepository implements ProductRepositoryInterface {

  /**
   * Array de product
   */
  protected products: Array<ProductModel> = [];

  constructor() {

  }  

  clearProducts() {
    this.products = [];
  }  

  /**
   * Ajout d'un produit
   * @param {ProductAddInterface} product - produit à ajouter
   * @returns {ProductModelInterface}
   */
  async save(product: ProductAddInterface): Promise<ProductModel> {
    
    // Date de création
    const createdDate: Date = new Date('2023-01-08 13:25:00');

    // id
    const id = this.products.length === 0 ? 1 : Math.max(...this.products.map(x=>x.id));

    const productModel = {
      id,
      productImageUrl: product.productImageUrl,
      openDate: product.openDate,
      createdDate,
      updatedDate: createdDate
    };

    this.products.push(productModel);
    return productModel;
  }  

  /**
   * Recherche d'un produit
   * @param {number} productId - ProduitId recherché
   * @returns {ProductModel|null}
   */
  async findOne(productId: number): Promise<ProductModel|null> {
    const findProducts: ProductModel|undefined = this.products.find(x=>x.id === productId);

    if(!findProducts) {
      return null;
    }
    
    return findProducts;
  }

  /**
   * Mise à jour d'un produit
   * @param { productUpdateInterface } product 
   */
  async updateOne(product: productUpdateInterface): Promise<ProductModel> {
    const findProduct =await this.findOne(product.id);

    if(!findProduct) {
      throw new Error('');
    }
    findProduct.openDate = product.openDate;
    findProduct.productImageUrl = product.productImageUrl;
    findProduct.updatedDate = new Date();

    return findProduct;
  }

  /**
   * Supprssion de tous les produits
   */
  async deleteAll(): Promise<void> {
    this.products = [];
  }
}
export { InMemoryProductRepository }
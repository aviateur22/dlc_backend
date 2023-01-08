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
   * @param {ProductInterface} product - Produit recherché
   * @returns {ProductModelInterface|null}
   */
  async findOne(product: ProductEnityInterface): Promise<ProductModelInterface|null> {
    const findProducts: ProductModelInterface|undefined = this.products.find(x=>x.id === product.id);

    if(!findProducts) {
      return null;
    }
    
    return findProducts;
  }

  /**
   * Supprssion de tous les produits
   */
  async deleteAll(): Promise<void> {
    this.products = [];
  }
}
export { InMemoryProductRepository }
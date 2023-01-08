/**
 * Model ProductEntity
 */
class ProductEntity implements ProductEnityInterface {
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export { ProductEntity }
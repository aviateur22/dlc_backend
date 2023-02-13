import { AddFriendUseCase } from "../../domain/useCases/AddFriendUseCase";
import { AddProductUseCase } from "../../domain/useCases/AddProductUseCase";
import { DeleteProductUseCase } from "../../domain/useCases/DeleteProductUseCase";
import { RegisterUserUseCase } from "../../domain/useCases/RegisterUserUseCase";
import { UpdateProductUseCase } from "../../domain/useCases/UpdateProductUseCase";

class UseCaseService {

  /**
   * AddFriendUseCase
   */
  public readonly addFriendUseCase: AddFriendUseCase;

  /**
   * AddProductUseCase
   */
  public readonly addProductUseCase: AddProductUseCase;

  /**
   * DeleteProductUseCase
   */
  public readonly deleteProductUseCase: DeleteProductUseCase;

  /**
   * RegisterUserUseCase
   */
  public readonly registerUserUseCase: RegisterUserUseCase;

  /**
   * UpdateProductUseCase
   */
  public readonly updateProductUseCase: UpdateProductUseCase;

  constructor() {

    // Initialisation des UseCases
    this.addFriendUseCase = new AddFriendUseCase();
    this.addProductUseCase = new AddProductUseCase();
    this.deleteProductUseCase = new DeleteProductUseCase();
    this.registerUserUseCase = new RegisterUserUseCase();
    this.updateProductUseCase = new UpdateProductUseCase();
  }
}

export { UseCaseService }
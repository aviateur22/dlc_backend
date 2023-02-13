import { UseCaseService } from "../useCaseService/UseCaseService";

/**
 * 
 */
class UseCases {
  protected static useCaseService: UseCaseService;

  /**
   * 
   * @returns UseCaseService
   */
  static getUseCases(): UseCaseService {
    if(!UseCases.useCaseService) {
      UseCases.useCaseService = new UseCaseService();
    }
    return UseCases.useCaseService;
  }
}

export { UseCases }
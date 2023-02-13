import { RepositoryEnum } from "../../helpers/repositories/RepositoryEnum";
import { RepositoryModel } from "../../helpers/repositories/RepositoryModel";
import { RepositoryService } from "../repositoryService/RepositoryService";

/**
 * 
 */
class Repository {
  protected static repositories: RepositoryModel;

  /**
   * Renvoie les repositories
   * @returns RepositoryModel
   */
  static getRepositories(): RepositoryModel {
    if(!Repository.repositories) {
      // Récupération des repositories
      Repository.repositories = RepositoryService.getRepository(RepositoryEnum.inMemory);      
    }

    return Repository.repositories;
  }
}

export { Repository }
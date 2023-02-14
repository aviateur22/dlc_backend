import { Repository } from "../../../services/instanciateService/Repository";

class Repositories {

  static async deleteRepositories() {
     // Vide les produits en base de données
     await Repository.getRepositories().productRepository.deleteAll();

     // Vide les utilisateurs en base de données
     await Repository.getRepositories().userRepository.deleteAll();
 
     //Vide les userProducts
     await Repository.getRepositories().userProductRepository.deleteAll();
 
     // Vide les FriendUsers
     await Repository.getRepositories().friendUserRepository.deleteAll();
  }
}

export { Repositories }
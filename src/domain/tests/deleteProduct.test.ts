import { SecurityFactory } from "../../factories/SecurityFactory";
import { Repository } from "../../helpers/repositories/Repository";
import { RepositoryActivate } from "../../helpers/repositories/RepositoryActivate";
import { RepositoryEnum } from "../../helpers/repositories/RepositoryEnum";

/**
 * Sécurité mot de passe
 */
const passwordSecurity: PasswordSecurityInterface = SecurityFactory.getPasswordSecurity();

/**
 * Recupération des repositories
 */
const repositories: Repository = RepositoryActivate.getRepository(RepositoryEnum.inMemory, passwordSecurity)

describe('DeleteProduct UseCase', ()=>{
  beforeEach(async()=>{
  // Vide les produits en base de données
  await repositories.productRepository.deleteAll();    

  // Vide les utilisateurs en base de données
  await repositories.userRepository.deleteAll();

  //Vide les userProducts
  await repositories.userProductRepository.deleteAll();
  });

  it('Should delete a product', ()=>{

  });
});
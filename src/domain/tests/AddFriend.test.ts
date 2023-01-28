import { UserNotFindException } from "../../exceptions/UserNotFindException";
import { SecurityFactory } from "../../factories/SecurityFactory";
import { Repository } from "../../helpers/repositories/Repository";
import { RepositoryActivate } from "../../helpers/repositories/RepositoryActivate";
import { RepositoryEnum } from "../../helpers/repositories/RepositoryEnum";
import { FriendUserModel } from "../../infra/adapters/repositories/models/FriendUserModel";
import { FriendUserEntity } from "../entities/FriendUserEntity";
import { AddFriendUseCase } from "../useCases/AddFriendUseCase";

/**
 * Sécurité mot de passe
 */
const passwordSecurity: PasswordSecurityInterface = SecurityFactory.getPasswordSecurity();

/**
 * Recupération des repositories
 */
const repositories: Repository = RepositoryActivate.getRepository(RepositoryEnum.inMemory, passwordSecurity);

describe('AddFreindUseCase', () => {
  beforeEach(async()=>{
    // Vide les produits en base de données
    await repositories.productRepository.deleteAll();

    // Vide les utilisateurs en base de données
    await repositories.userRepository.deleteAll();

    //Vide les userProducts
    await repositories.userProductRepository.deleteAll();

    // Vide les FriendUsers
    await repositories.friendUserRepository.deleteAll();
  });

  it('Should add a friend', async() => {
    try {
     // Ajout d'un utilisateur
      const user1 = await repositories.userRepository.save({
        email: 'aviateur22@hotmail.fr',
        password: 'affirmer2011',
        confirmPassword: 'affirmer2011'
      });

      // Ajout d'un utilisateur - Role de friends
      const user2 = await repositories.userRepository.save({
        email: 'aviateur@hotmail.fr',
        password: 'affirmer2011',
        confirmPassword: 'affirmer2011'
      });

      // Vérification utilisateur
      if(!user1 || !user2) {
        throw new UserNotFindException();
      }

      // Ajout d'un ami
      const addFriendUser: AddFriendUserInterface = {
        userId: user1.id,
        friendId: user2.id,
        updateProduct: false,
        deleteProduct: false
      }

      // Ajout d'un ami 
      const addFriendUseCase = new AddFriendUseCase(repositories);
      const addFriend = await addFriendUseCase.execute(addFriendUser);

      // Recherche friendUser
      const friendUser: FriendUserModel = repositories.friendUserRepository.findOne({
        userId: user1.id, 
        friendId: user2.id
      });

      expect(addFriend).toBeInstanceOf(FriendUserEntity);
      expect(friendUser).toBeInstanceOf(FriendUserModel);

    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
});
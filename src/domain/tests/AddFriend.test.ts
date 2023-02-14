import { FriendAlreadyExistException } from "../../exceptions/FriendAlreadyExistException";
import { UserNotFindException } from "../../exceptions/UserNotFindException";
import { FriendUserModel } from "../../infra/adapters/repositories/models/FriendUserModel";
import { Repository } from "../../services/instanciateService/Repository";
import { UseCases } from "../../services/instanciateService/UseCases";
import { UseCaseService } from "../../services/useCaseService/UseCaseService";
import { FriendUserEntity } from "../entities/FriendUserEntity";
import { AddFriendUseCase } from "../useCases/AddFriendUseCase";
import { User } from "./utility/User";
import { Product } from "./utility/Product";
import { Repositories } from "./utility/Repositories";


// useCases
const useCases: UseCaseService = UseCases.getUseCases();

// repositories
const repositories = Repository.getRepositories();

describe('AddFreindUseCase', () => {
  beforeEach(async()=>{
    
    // Reset Repository
    await Repositories.deleteRepositories();
  });

  it('Should add a friend', async() => {
    try {
        
     // Ajout d'un utilisateur
      const user1 = await User.createUser();

      // Ajout d'un utilisateur - Role de friends
      const user2 = await User.createUser();

      // Vérification utilisateur
      if(!user1 || !user2) {
        throw new UserNotFindException();
      }

      // Ajout de produit
      Product.addProducts(user1.id);

      // Ajout d'un ami
      const addFriendUser: AddFriendUserInterface = {
        userId: user1.id,
        friendId: user2.id,
        updateProduct: false,
        deleteProduct: false
      }

      // Ajout d'un ami      
      const addFriendUseCase = useCases.addFriendUseCase;
      const addFriend = await addFriendUseCase.execute(addFriendUser);

      // Recherche friendUser 
      const friendUser: FriendUserModel| null = repositories.friendUserRepository.findOne({
        userId: user1.id, 
        friendId: user2.id
      });      

      // Vérification ajout amis
      expect(addFriend).toBeInstanceOf(FriendUserEntity);
      expect(friendUser).toBeInstanceOf(FriendUserModel);

      // Vérification association friend - produit
      const userProducts = await repositories.userProductRepository.findAllByUser(user1.id);
      const friendProducts = await repositories.userProductRepository.findAllByUser(user2.id);
      
     

      if(!userProducts || !friendProducts) {
        throw new Error('Impossible de comparer les produits utilisateur et friend');
      }

      userProducts.forEach(userProduct => {
        const findProduct = friendProducts.find(friendProduct=>(userProduct.productId === friendProduct.productId));        
        expect(findProduct).toBeTruthy();        
      });
    } catch (error) {
      console.log(error);
      expect(error).toBeFalsy();
    }
  });

  it('Should throw FriendAlreadyExistException because there are already freinds', async ()=>{
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
      const addFriendUseCase = new AddFriendUseCase();
      const addFriend = await addFriendUseCase.execute(addFriendUser);
      const addFriend1 = await addFriendUseCase.execute(addFriendUser);

      // Recherche friendUser
      const friendUser: FriendUserModel|null = repositories.friendUserRepository.findOne({
        userId: user1.id, 
        friendId: user2.id
      });

      expect(addFriend).toBeInstanceOf(FriendUserModel);
      expect(addFriend1).toBeFalsy();
      expect(friendUser).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(FriendAlreadyExistException);
    }
  });
});
import { FriendAlreadyExistException } from "../../exceptions/FriendAlreadyExistException";
import { FriendUserModel } from "../../infra/adapters/repositories/models/FriendUserModel";
import { Repository } from "../../services/instanciateService/Repository";
import { FriendUserMapper } from "../dtos/FriendUserMapper";
import { FriendUserEntity } from "../entities/FriendUserEntity";

class AddFriendUseCase {

  /**
   * userProductRepository
   */
  private friendUserRepository = Repository.getRepositories().friendUserRepository;
   
  /**
   * Ajout ami
   */
  async execute(addFriendUser: AddFriendUserInterface): Promise<FriendUserEntity> {

    const findFriend: FindFriendUserInterface = {
      userId: addFriendUser.userId,
      friendId: addFriendUser.friendId
    }

    // Vérification si pas déja en relation
    const isFriendFind: FriendUserModel|null = this.friendUserRepository.findOne(findFriend);

    if(isFriendFind) {
      throw new FriendAlreadyExistException('');
    }

    // Ajout de la nouvelle relation
    const addFriend: FriendUserModel = await this.friendUserRepository.save(addFriendUser);
    
    
    return FriendUserMapper.FriendUserEntity(addFriend);
  }
}
export { AddFriendUseCase }
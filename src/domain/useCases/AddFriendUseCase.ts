import { FriendAlreadyExistException } from "../../exceptions/FriendAlreadyExistException";
import { Repository } from "../../helpers/repositories/Repository";
import { FriendUserModel } from "../../infra/adapters/repositories/models/FriendUserModel";
import { FriendUserMapper } from "../dtos/FriendUserMapper";
import { FriendUserEntity } from "../entities/FriendUserEntity";
import { FriendUserRepositoryInterface } from "../ports/repository/FriendUserRepositoryInterface";
import { UserRepositoryInterface } from "../ports/repository/UserRepositoryInterface";

class AddFriendUseCase {
  /**
   * Repository User
   */
  protected userRepository: UserRepositoryInterface;

  /**
   * Repository FriendUser
   */
  protected friendUserRepository: FriendUserRepositoryInterface;

  constructor(repositories: Repository) {
    this.userRepository = repositories.userRepository;
    this.friendUserRepository = repositories.friendUserRepository;    
  }

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
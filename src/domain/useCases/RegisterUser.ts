import { UserMapper } from "../mappers/UserMapper";
import { PasswordMissingException } from "../exceptions/PasswordMissingException";
import { EmailFindException } from "../exceptions/EmailFindException";
import { UserInputInterface } from "../ports/input/UserInputInterface";
import { UserRepositoryInterface } from "../provider/respository/UserRepositoryInterface";
import { PasswordNotIdenticalException } from "../exceptions/PasswordNotIdenticalException";

/**
 * Enregistrement utilisateur
 */
class RegisterUser {
  user: UserInputInterface;
  userRepository: UserRepositoryInterface;
  passwordSecurity: PasswordSecurityInterface;
  userMapper: UserMapper

  constructor(
    user: UserInputInterface,
    userRepository: UserRepositoryInterface,
    passwordSecurity: PasswordSecurityInterface,
    userMapper: UserMapper
    ) {
    this.user = user;
    this.userRepository = userRepository;
    this.passwordSecurity = passwordSecurity;
    this.userMapper = userMapper
  }

  /**
   * Inscription nouveau client
   */
  async register(): Promise<UserOutputInterface> {
    if(!this.user.password || !this.user.confirmPassword) {
      throw new PasswordMissingException('');
    }

    if(this.user.password !== this.user.confirmPassword) {
      throw new PasswordNotIdenticalException('')
    }

    if(await this.userRepository.getOneUser(this.user)){
      throw new EmailFindException('');
    }

    const addUser = await this.userRepository.addUser(this.user);

    // Map le résultat 
    return this.userMapper.userDto(addUser);
  }
}
export {RegisterUser}
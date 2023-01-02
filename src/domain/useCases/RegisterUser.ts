import { UserDto } from "../dto/UserDto";
import { PasswordMissingException } from "../exception/PasswordMissingException";
import { EmailFindException } from "../exception/EmailFindException";
import { UserInputInterface } from "../inputs/user/UserInputInterface";
import { UserRepositoryInterface } from "../provider/userRepository/UserRepositoryInterface";
import { PasswordNotIdenticalException } from "../exception/PasswordNotIdenticalException";

/**
 * Enregistrement utilisateur
 */
class RegisterUser {
  user: UserInputInterface;
  userRepository: UserRepositoryInterface;
  passwordSecurity: PasswordSecurityInterface;
  userOutput: UserOutputInterface;

  constructor(
    user: UserInputInterface,
    userRepository: UserRepositoryInterface,
    passwordSecurity: PasswordSecurityInterface,
    userOutput: UserOutputInterface
    ) {
    this.user = user;
    this.userRepository = userRepository;
    this.passwordSecurity = passwordSecurity;
    this.userOutput = userOutput
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
    return new UserDto(addUser, this.userOutput).userDto();
  }
}
export {RegisterUser}
import { EmailFindException } from "../exceptions/EmailFindException";
import { PasswordMissingException } from "../exceptions/PasswordMissingException";
import { PasswordNotIdenticalException } from "../exceptions/PasswordNotIdenticalException";
import { ApiFactory } from "../factories/ApiFactory";
import { UserInputInterface } from "../ports/input/UserInputInterface";
import { UserOutputModel } from "../../infra/adapters/input/UserOutputModel";
import { UserRepositoryInterface } from "../provider/respository/UserRepositoryInterface";
import { RegisterUser } from "../useCases/RegisterUser";
import { UserMapper } from "../mappers/UserMapper";

/**
 * Sécurité mot de passe
 */
let passwordSecurity: PasswordSecurityInterface;

/**
 * User repository
 */
let userRepository: UserRepositoryInterface;

/**
 * Mapper pour renvoyer User
 */
let userMapper: UserMapper;

beforeEach(()=>{   
  passwordSecurity = ApiFactory.getPasswordSecurity();

  userRepository = ApiFactory.getUserRepositoryModel(passwordSecurity);

  userMapper = ApiFactory.getUserMapper();

  // Réinitilaisation
  userRepository.init()
});

describe('Usecase registerUser', function() {
  it('Should register a new user', async ()=>{
      // Données utilisateur
      const email: string = 'aviateur@hotmail.fr';
      const password: string = 'affirmer2011';
      const confirmPassword: string = password;

      try {
        // User
        const user: UserInputInterface = ApiFactory.getUserInputModel(email, undefined, password, confirmPassword);

        // UseCase registerUser
        const registerUser = new RegisterUser(user, userRepository, passwordSecurity, userMapper);

        const addUser: UserOutputInterface = await registerUser.register();

        expect(addUser).toBeInstanceOf(UserOutputModel);
        expect(addUser).toHaveProperty('name', undefined);        
        expect(addUser).toHaveProperty('email', email);

      } catch (error) {
        expect(error).toBeFalsy();
      }
  });

  it('Should throw EmailRegisterException because email is already register', async ()=>{
    // Données utilisateur
    const email: string = 'aviateur22@hotmail.fr';
    const password: string = 'affirmer2011';
    const confirmPassword: string = password;

    try {
      // User
      const user: UserInputInterface = ApiFactory.getUserInputModel(email, undefined, password, confirmPassword);

      // UseCase registerUser
      const registerUser = new RegisterUser(user, userRepository, passwordSecurity, userMapper);

      // ajout utilisateur
      const addUser: UserOutputInterface = await registerUser.register();

      expect(addUser).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(EmailFindException);
    }
  });

  it('Should throw PasswordNotIdenticException because password are not the same', async()=>{
    // Données utilisateur
    const email: string = 'aviateur22@hotmail.fr';
    const password: string = 'affirmer2011';
    const confirmPassword: string = 'affirmer201';

    try {
      // User
      const user: UserInputInterface = ApiFactory.getUserInputModel(email, undefined, password, confirmPassword);

      // UseCase registerUser
      const registerUser = new RegisterUser(user, userRepository, passwordSecurity, userMapper);

      // ajout utilisateur
      const addUser: UserOutputInterface = await registerUser.register();

      expect(addUser).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(PasswordNotIdenticalException);
    }
  });

  it('Should throw PasswordMissingexception because password is missing',async()=>{
    // Données utilisateur
    const email: string = 'aviateur22@hotmail.fr';
    const password: string = 'affirmer2011';
    const confirmPassword: string = '';

    try {
      // User
      const user: UserInputInterface = ApiFactory.getUserInputModel(email, undefined, password, confirmPassword);

      // UseCase registerUser
      const registerUser = new RegisterUser(user, userRepository, passwordSecurity, userMapper);

      // ajout utilisateur
      const addUser: UserOutputInterface = await registerUser.register();

      expect(addUser).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(PasswordMissingException);
    }
  })
});
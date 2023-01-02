import { EmailFindException } from "../exception/EmailFindException";
import { PasswordMissingException } from "../exception/PasswordMissingException";
import { PasswordNotIdenticalException } from "../exception/PasswordNotIdenticalException";
import { ApiFactory } from "../factories/ApiFactory";
import { UserInputInterface } from "../inputs/user/UserInputInterface";
import { UserOutputModel } from "../outputs/user/UserOutputModel";
import { UserRepositoryInterface } from "../provider/userRepository/UserRepositoryInterface";
import { RegisterUser } from "../useCases/RegisterUser";

/**
 * Sécurité mot de passe
 */
let passwordSecurity: PasswordSecurityInterface;

/**
 * User repository
 */
let userRepository: UserRepositoryInterface;

/**
 * model userOutput 
 */
let userOutput: UserOutputInterface;

beforeEach(()=>{   
  passwordSecurity = ApiFactory.getPasswordSecurity();

  userRepository = ApiFactory.getUserRepositoryModel(passwordSecurity);

  userOutput = ApiFactory.getUserOutputModel();

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
        const registerUser = new RegisterUser(user, userRepository, passwordSecurity, userOutput);

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
      const registerUser = new RegisterUser(user, userRepository, passwordSecurity, userOutput);

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
      const registerUser = new RegisterUser(user, userRepository, passwordSecurity, userOutput);

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
      const registerUser = new RegisterUser(user, userRepository, passwordSecurity, userOutput);

      // ajout utilisateur
      const addUser: UserOutputInterface = await registerUser.register();

      expect(addUser).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(PasswordMissingException);
    }
  })
});
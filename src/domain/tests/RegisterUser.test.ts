import { UserEntity } from "../../infra/adapters/input/UserEntity";
import { EmailFindException } from "../exceptions/EmailFindException";
import { PasswordMissingException } from "../exceptions/PasswordMissingException";
import { PasswordNotIdenticalException } from "../exceptions/PasswordNotIdenticalException";
import { RepositoryFactory } from "../factories/RepositoryFactory";
import { SecurityFactory } from "../factories/SecurityFactory";
import { UserFactory } from "../factories/UserFactory";
import { UserRepositoryInterface } from "../provider/respository/UserRepositoryInterface";
import { RegisterUser } from "../useCases/RegisterUser";

/**
 * Sécurité mot de passe
 */
let passwordSecurity: PasswordSecurityInterface;

/**
 * User repository
 */
let userRepository: UserRepositoryInterface;

beforeEach(()=>{   
  passwordSecurity = SecurityFactory.getPasswordSecurity();

  userRepository = RepositoryFactory.getUserRepositoryModel(passwordSecurity);

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
        const user: UserRegisterInterface = UserFactory.getUserRegister(email, password, confirmPassword);

        // UseCase registerUser
        const registerUser = new RegisterUser(user, userRepository, passwordSecurity);

        // Ajout utilisateur
        const addUser: UserEntityInterface|null = await registerUser.register();

        expect(addUser).toBeInstanceOf(UserEntity);
        expect(addUser).toHaveProperty('name', '');        
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
      const user: UserRegisterInterface = UserFactory.getUserRegister(email, password, confirmPassword);

      // UseCase registerUser
      const registerUser = new RegisterUser(user, userRepository, passwordSecurity);

      // Ajout utilisateur
      const addUser: UserEntityInterface|null = await registerUser.register();

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
      const user: UserRegisterInterface = UserFactory.getUserRegister(email, password, confirmPassword);

      // UseCase registerUser
      const registerUser = new RegisterUser(user, userRepository, passwordSecurity);

      // Ajout utilisateur
      const addUser: UserEntityInterface|null = await registerUser.register();

      expect(addUser).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(PasswordNotIdenticalException);
    }
  });

  it('Should throw PasswordMissingexception because 1 password is missing',async()=>{
    // Données utilisateur
    const email: string = 'aviateur22@hotmail.fr';
    const password: string = 'sssdf';
    const confirmPassword: string = '';

    try {
      // User
      const user: UserRegisterInterface = UserFactory.getUserRegister(email, password, confirmPassword);

      // UseCase registerUser
      const registerUser = new RegisterUser(user, userRepository, passwordSecurity);

      // Ajout utilisateur
      const addUser: UserEntityInterface|null = await registerUser.register();

      console.log(addUser);
      expect(addUser).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(PasswordMissingException);
    }
  });

  it('Should throw PasswordMissingexception because both password are missing',async()=>{
    // Données utilisateur
    const email: string = 'aviateur22@hotmail.fr';
    const password: string = '';
    const confirmPassword: string = '';

    try {
      // User
      const user: UserRegisterInterface = UserFactory.getUserRegister(email, password, confirmPassword);

      // UseCase registerUser
      const registerUser = new RegisterUser(user, userRepository, passwordSecurity);

      // Ajout utilisateur
      const addUser: UserEntityInterface|null = await registerUser.register();
      
      console.log(addUser);
      expect(addUser).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(PasswordMissingException);
    }
  })
});
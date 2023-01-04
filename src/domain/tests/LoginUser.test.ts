import { UserMapper } from '../mappers/UserMapper';
import { PasswordInvalidException } from '../exceptions/PasswordInvalidException';
import { PasswordMissingException } from '../exceptions/PasswordMissingException';
import { UserNotFindException } from '../exceptions/UserNotFindException';
import { ApiFactory } from '../factories/ApiFactory';
import { UserRepositoryInterface } from '../provider/respository/UserRepositoryInterface';
import { LoginUser } from '../useCases/LoginUser';

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

  // Réinitialisation de la base de données
  userRepository.init()
});
 
describe('Usecase loginUser', function() {

  it('Should grant user access', async function() {
    try {
       // Données utilisateur
      const email: string = 'aviateur22@hotmail.fr';
      const password: string = 'affirmer2011';

      // User
      const user = ApiFactory.getUserInputModel(email, undefined, password);

      // UseCase LoginUser
      const loginUser = new LoginUser(user, userRepository, passwordSecurity, userMapper); 
      
      // Recherche de l'utilisateur
      const findLoginUser: UserOutputInterface|null = await loginUser.findLoginUser();
    
      expect(findLoginUser).toHaveProperty('email', email);
    } catch (error) {
      expect(error).toBeFalsy();
    }   
  });

  it('Should throw UserNotFindException because user should not be find in database', async function() {
    try {
      // Données utilisateur
      const email: string = 'aviateur2@hotmail.fr';
      const password: string = 'affirmer2011';
  
     // User
     const user = ApiFactory.getUserInputModel(email, undefined, password);

      // UseCase LoginUser
      const loginUser = new LoginUser(user, userRepository, passwordSecurity, userMapper);
      const findLoginUser: UserOutputInterface|null = await loginUser.findLoginUser();

      expect(findLoginUser).toBeFalsy();
    } catch (error: any) {
      expect(error).toBeInstanceOf(UserNotFindException);
    }

  });

  it('Should throw InvalidPasswordException because user password is unvalid', async ()=>{
    try {
      // Données utilisateur
      const email: string = 'aviateur22@hotmail.fr';
      const password: string = 'afirmer2011';

      // User
      const user = ApiFactory.getUserInputModel(email, undefined, password);

      // UseCase LoginUser
      const loginUser = new LoginUser(user, userRepository, passwordSecurity, userMapper);  

      // Recherche de l'utilisateur
      const findLoginUser: UserOutputInterface|null = await loginUser.findLoginUser();
    
      expect(findLoginUser).toBeFalsy();
    } catch (error: any) {
      expect(error).toBeInstanceOf(PasswordInvalidException)
    }
  });

  it('Should throw PasswordMissingException because input password is empty', async()=>{
    try {
      // Données utilisateur
      const email: string = 'aviateur22@hotmail.fr';
      const password: string = '';

      // User
      const user = ApiFactory.getUserInputModel(email, undefined, undefined);

      // UseCase LoginUser
      const loginUser = new LoginUser(user, userRepository, passwordSecurity, userMapper);  

      // Recherche de l'utilisateur
      const findLoginUser: UserOutputInterface|null = await loginUser.findLoginUser();
    
      expect(findLoginUser).toBeFalsy();
    } catch (error: any) {
      expect(error).toBeInstanceOf(PasswordMissingException)
    }
  });
});

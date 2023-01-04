import { PasswordInvalidException } from '../exceptions/PasswordInvalidException';
import { PasswordMissingException } from '../exceptions/PasswordMissingException';
import { UserNotFindException } from '../exceptions/UserNotFindException';
import { RepositoryFactory } from '../factories/RepositoryFactory';
import { SecurityFactory } from '../factories/SecurityFactory';
import { UserFactory } from '../factories/UserFactory';
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

beforeEach(()=>{   
  passwordSecurity = SecurityFactory.getPasswordSecurity();

  userRepository = RepositoryFactory.getUserRepositoryModel(passwordSecurity);

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
      const user = UserFactory.getUserLogin(email, password);

      // UseCase LoginUser
      const loginUser = new LoginUser(user, userRepository, passwordSecurity); 
      
      // Recherche de l'utilisateur
      const findLoginUser: UserEntityInterface|null = await loginUser.findLoginUser();
    
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
      const user = UserFactory.getUserLogin(email, password);

      // UseCase LoginUser
      const loginUser = new LoginUser(user, userRepository, passwordSecurity); 
      
      // Recherche de l'utilisateur
      const findLoginUser: UserEntityInterface|null = await loginUser.findLoginUser();

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
       const user = UserFactory.getUserLogin(email, password);

       // UseCase LoginUser
       const loginUser = new LoginUser(user, userRepository, passwordSecurity); 
       
       // Recherche de l'utilisateur
       const findLoginUser: UserEntityInterface|null = await loginUser.findLoginUser();
    
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
      const user = UserFactory.getUserLogin(email, password);

      // UseCase LoginUser
      const loginUser = new LoginUser(user, userRepository, passwordSecurity); 
      
      // Recherche de l'utilisateur
      const findLoginUser: UserEntityInterface|null = await loginUser.findLoginUser();
    
      expect(findLoginUser).toBeFalsy();
    } catch (error: any) {
      expect(error).toBeInstanceOf(PasswordMissingException)
    }
  });
});

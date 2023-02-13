import { PasswordInvalidException } from '../../exceptions/PasswordInvalidException';
import { PasswordMissingException } from '../../exceptions/PasswordMissingException';
import { UserNotFindException } from '../../exceptions/UserNotFindException';
import { LoginUserUseCase } from '../useCases/LoginUserUseCase';
import { RepositoryModel } from '../../helpers/repositories/RepositoryModel';
import { UserEntity } from '../entities/UserEntity';
import { Repository } from '../../services/instanciateService/Repository';
import { PasswordSecurityService } from '../../services/instanciateService/PasswordSecurity';

/**
 * Sécurité mot de passe
 */
let passwordSecurity: PasswordSecurityInterface = PasswordSecurityService.getPasswordSecurity();

/**
 * Recupération des repositories
 */
const repositories: RepositoryModel =  Repository.getRepositories();

beforeEach(async()=>{   
  // Vide la liste des users
  await repositories.userRepository.deleteAll();

  // Ajout d'un utilisateur
  await repositories.userRepository.save({
    email: 'aviateur22@hotmail.fr',
    password: 'affirmer2011',
    confirmPassword: 'affirmer2011'
  });
});
 
describe('Usecase loginUser', function() {

  it('Should grant user access', async function() {
    try {

       // Données utilisateur
      const email: string = 'aviateur22@hotmail.fr';
      const password: string = 'affirmer2011';

      // User
      const user: UserConnectInterface = {
        email: email,
        password: password
      };

      // UseCase LoginUser
      const loginUserUseCase = new LoginUserUseCase(); 
      
      // Recherche de l'utilisateur
      const loginUser: UserEntity|null = await loginUserUseCase.execute(user);
    
      expect(loginUser).toHaveProperty('email', email);
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
      const user: UserConnectInterface = {
        email: email,
        password: password
      };

      // UseCase LoginUser
      const loginUserUseCase = new LoginUserUseCase(); 
      
      // Recherche de l'utilisateur
      const loginUser: UserEntity|null = await loginUserUseCase.execute(user);

      expect(loginUser).toBeFalsy();
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
       const user: UserConnectInterface = {
        email: email,
        password: password
      };;

       // UseCase LoginUser
       const loginUserUseCase = new LoginUserUseCase(); 
       
       // Recherche de l'utilisateur
       const loginUSer: UserEntity|null = await loginUserUseCase.execute(user);
    
      expect(loginUSer).toBeFalsy();
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
      const user: UserConnectInterface = {
        email: email,
        password: password
      };

      // UseCase LoginUser
      const loginUserUseCase = new LoginUserUseCase(); 
      
      // Recherche de l'utilisateur
      const loginUser: UserEntity|null = await loginUserUseCase.execute(user);
    
      expect(loginUser).toBeFalsy();
    } catch (error: any) {
      expect(error).toBeInstanceOf(PasswordMissingException)
    }
  });
});

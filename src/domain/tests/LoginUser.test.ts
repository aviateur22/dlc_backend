import { PasswordInvalidException } from '../../exceptions/PasswordInvalidException';
import { PasswordMissingException } from '../../exceptions/PasswordMissingException';
import { UserNotFindException } from '../../exceptions/UserNotFindException';
import { RepositoryActivate } from '../../helpers/repositories/RepositoryActivate';
import { SecurityFactory } from '../../factories/SecurityFactory';
import { UserFactory } from '../../factories/UserFactory';
import { LoginUserUseCase } from '../useCases/LoginUserUseCase';
import { Repository } from '../../helpers/repositories/Repository';
import { RepositoryEnum } from '../../helpers/repositories/RepositoryEnum';
import { UserEntity } from '../entities/UserEntity';

/**
 * Sécurité mot de passe
 */
let passwordSecurity: PasswordSecurityInterface = SecurityFactory.getPasswordSecurity();

/**
 * Recupération des repositories
 */
const repositories: Repository = RepositoryActivate.getRepository(RepositoryEnum.inMemory, passwordSecurity);

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
      const user: UserConnectInterface = UserFactory.getUserLogin(email, password);

      // UseCase LoginUser
      const loginUserUseCase = new LoginUserUseCase(repositories, passwordSecurity); 
      
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
      const user = UserFactory.getUserLogin(email, password);

      // UseCase LoginUser
      const loginUserUseCase = new LoginUserUseCase(repositories, passwordSecurity); 
      
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
       const user = UserFactory.getUserLogin(email, password);

       // UseCase LoginUser
       const loginUserUseCase = new LoginUserUseCase(repositories, passwordSecurity); 
       
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
      const user = UserFactory.getUserLogin(email, password);

      // UseCase LoginUser
      const loginUserUseCase = new LoginUserUseCase(repositories, passwordSecurity); 
      
      // Recherche de l'utilisateur
      const loginUser: UserEntity|null = await loginUserUseCase.execute(user);
    
      expect(loginUser).toBeFalsy();
    } catch (error: any) {
      expect(error).toBeInstanceOf(PasswordMissingException)
    }
  });
});

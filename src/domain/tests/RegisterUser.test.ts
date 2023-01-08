import { UserEntity } from "../../infra/adapters/user/UserEntity";
import { EmailFindException } from "../../exceptions/EmailFindException";
import { PasswordMissingException } from "../../exceptions/PasswordMissingException";
import { PasswordNotIdenticalException } from "../../exceptions/PasswordNotIdenticalException";
import { RepositoryActivate } from "../../helpers/repositories/RepositoryActivate";
import { SecurityFactory } from "../../factories/SecurityFactory";
import { UserFactory } from "../../factories/UserFactory";
import { RegisterUserUseCase } from "../useCases/RegisterUserUseCase";
import { Repository } from "../../helpers/repositories/Repository";
import { RepositoryEnum } from "../../helpers/repositories/RepositoryEnum";

/**
 * Sécurité mot de passe
 */
let passwordSecurity: PasswordSecurityInterface = SecurityFactory.getPasswordSecurity();

/**
 * Recupération des repositories
 */
const repositories: Repository = RepositoryActivate.getRepository(RepositoryEnum.inMemory, passwordSecurity);

beforeEach(async()=>{   
  // Vide le repository
  await repositories.userRepository.deleteAll();

  // Ajout d'un utilisateur
  await repositories.userRepository.save({
    email: 'aviateur22@hotmail.fr',
    password: 'affirmer2011',
    confirmPassword: 'affirmer2011'
  });
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
        const registerUserUseCase = new RegisterUserUseCase(repositories, passwordSecurity);

        // Ajout utilisateur
        const addUser: UserEntityInterface|null = await registerUserUseCase.execute(user);

        expect(addUser).toBeInstanceOf(UserEntity);

        if(!addUser) {
          throw new Error();
        }

        expect(repositories.userRepository.findOne(
          {
            email: addUser.email
          })
        ).toBeTruthy();

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
      const registerUserUseCase = new RegisterUserUseCase(repositories, passwordSecurity);

      // Ajout utilisateur
      const addUser: UserEntityInterface|null = await registerUserUseCase.execute(user);

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
      const registerUserUseCase = new RegisterUserUseCase(repositories, passwordSecurity);

      // Ajout utilisateur
      const addUser: UserEntityInterface|null = await registerUserUseCase.execute(user);

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
      const registerUserUseCase = new RegisterUserUseCase(repositories, passwordSecurity);

      // Ajout utilisateur
      const addUser: UserEntityInterface|null = await registerUserUseCase.execute(user);

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
      const registerUserUseCase = new RegisterUserUseCase(repositories, passwordSecurity);

      // Ajout utilisateur
      const addUser: UserEntityInterface|null = await registerUserUseCase.execute(user);
      
      expect(addUser).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(PasswordMissingException);
    }
  })
});
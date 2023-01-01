import { UserEntity } from '../entities/UserEntity';
import { ApiFactory } from '../factories/ApiFactory';
import { LoginUser } from '../useCases/LoginUser';

describe('usecase login user', function() {
  it('user should be able to login', function() {
    // Données utilisateur
    const email: string = '';
    const password: string = '';

    // Model
    const userRepository = ApiFactory.getUserRepositoryModel();    
    const user = ApiFactory.getUserInputModel(email, undefined, password);


    // UseCase LoginUser
    const loginUser = new LoginUser(user, userRepository);
   

    // teste userRepository
    let findUser = userRepository.getOneUser(user);


    const findLoginUser: UserOutputInterface|null = loginUser.findLoginUser();
    console.log(findLoginUser);
    if(!findLoginUser) {
      return;
    }

    console.log(findLoginUser);
    expect(findUser).toBeInstanceOf(UserEntity)
    expect(findLoginUser).toHaveProperty('nme', '');
  });
})
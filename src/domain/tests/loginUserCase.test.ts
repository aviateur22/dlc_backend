import { ApiFactory } from '../factories/ApiFactory';
import { LoginUserOutput } from '../outputs/LoginUserOutput';
import { LoginUser } from '../useCases/LoginUser';

describe('usecase login user', function() {
  it('user should be able to login', function() {
    const email: string = '';
    const password: string = '';
    
    const user = ApiFactory.getUserInputModel(email, undefined, password);

    const loginUser = new LoginUser(user);
    const userResponseModel = loginUser.execute();
    const userLoginResponse = new LoginUserOutput(userResponseModel, 200);
    const response = userLoginResponse.present();

    const userResult = response.user;

    
    expect(userResult).toHaveProperty('name', 'name')
  });
})
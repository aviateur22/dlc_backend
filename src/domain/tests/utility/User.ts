import { Repository } from "../../../services/instanciateService/Repository";
import { Utilities } from "./Utilities";


class User {
  private static userData = [
    {
      email: 'aviateur22',
      password: 'affirmer2011',
      confirmPassword: 'affirmer2011'
    },
    {
      email: 'aviateur22',
      password: 'affirmer2011',
      confirmPassword: 'affirmer2011'
    },
    {
      email: 'aviateur22',
      password: 'affirmer2011',
      confirmPassword: 'affirmer2011'
    },
    {
      email: 'aviateur22',
      password: 'affirmer2011',
      confirmPassword: 'affirmer2011'
    }
  ];

  /**
   * 
   */
  static async createUser() {
    // Index
    const randomIndex = Utilities.randomIndexFromArray(User.userData);

    // Ajout d'un utilisateur
    const addUser = await Repository.getRepositories().userRepository.save({
      email: User.userData[randomIndex].email,
      password: User.userData[randomIndex].password,
      confirmPassword: User.userData[randomIndex].confirmPassword
    });

    return addUser;
  }
  
  /**
   * 
   * @param {UserRegisterInterface} user 
   * @returns 
   */
  static async createUSerWithParameters(user: UserRegisterInterface) {
    // Ajout d'un utilisateur
    const addUser = await Repository.getRepositories().userRepository.save({
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword
    });

    return addUser;
  }
}

export { User }

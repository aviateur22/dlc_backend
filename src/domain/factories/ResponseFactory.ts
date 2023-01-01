import { UserOutpoutModel } from "../outputs/base/user/UserOutpoutModel";

/**
 * Factory pour chargement des modéles de réponse
 */
class ResponseFactory {

  /**
   * renvoie le modèle de données sélectionné 
   * @param {string} email 
   * @param {string} name 
   * @param {string} userImageUrl 
   * @returns { UserReponseModelInterface }
   */
  static getUserResponseModel(email: string, name: string, userImageUrl: string): UserOutputInterface {
    return new UserOutpoutModel('email', 'name', 'userImageUrl');
  }  
}

export { ResponseFactory };
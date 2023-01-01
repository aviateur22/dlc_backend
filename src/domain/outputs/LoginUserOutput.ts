/**
 * Réponse userLogin
 */
class LoginUserOutput implements ResponseInterface {
  protected user: UserOutputInterface;
  statusCode: number;
  responseText?: string | undefined;

  constructor(user: UserOutputInterface, statusCode: number, responseText?: string) {
    this.user = user;
    this.statusCode = statusCode;
    this.responseText = responseText;
  }

  /**
   * Renvoie la réponse
   * @returns {object}
   */
  present(): any {
    return {
      'user': this.user,
      'statusCode': this.statusCode,
      'responseText': this.responseText
    }
  }
}

export { LoginUserOutput }
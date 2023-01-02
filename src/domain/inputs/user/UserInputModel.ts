import { UserInputInterface } from "./UserInputInterface";

/**
 * Modèle user Input
 */
class UserInputModel implements UserInputInterface {
  email: string;
  name?: string|undefined;
  password?: string|undefined;
  confirmPassword?: string|undefined;

  constructor(email: string, name?: string, password?: string, confirmPassword?: string) {
    this.email = email;    
    this.name = name;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}

export { UserInputModel };
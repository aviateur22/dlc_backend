import { UserInputInterface } from "./UserInputInterface";

/**
 * Modèle user Input
 */
class UserInputModel implements UserInputInterface {
  password?: string | undefined;
  name?: string | undefined;
  email: string;

  constructor(email: string, name?: string, password?: string) {
    this.email = email;
    this.password = password;
    this.name = name;
  }
}

export { UserInputModel };
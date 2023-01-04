/**
 * Modele userInput 
 */
interface UserInputInterface {
  email: string;  
  name?: string;
  password?: string;
  confirmPassword?: string
}

export { UserInputInterface };
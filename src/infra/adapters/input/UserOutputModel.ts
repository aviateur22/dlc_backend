/**
 * Modele User
 * Allant du DOMAIN vers l'INFRA
 */
class UserOutputModel implements UserOutputInterface {
  email!: string;
  name?: string;
  userImageUrl!: string;
}

export {UserOutputModel}
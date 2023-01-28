/**
 * Exception mot de passe invalide
 */
class FriendAlreadyExistException extends Error {
  constructor(message: string) {
    super(message);

    if(!message) {
      this.message = 'Vous êtes déja rattaché à cet utilisateur';
    }
  }
}

export { FriendAlreadyExistException }
/**
 * Interface pour Suppression d'un nouvel ami
 */
interface DeleteFriendUserInterface {
  // Id de l'utilisateur ajoutant l'ami
  userId: number;

  // Id de l'ami
  friendId: number;
}
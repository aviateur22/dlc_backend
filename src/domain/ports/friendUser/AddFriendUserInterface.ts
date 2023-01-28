/**
 * Interface pour Ajout d'un nouvel ami
 */
interface AddFriendUserInterface {
  // Id de l'utilisateur ajoutant l'ami
  userId: number;

  // Id de l'ami
  friendId: number;

  // Droit de modifier un produit
  updateProduct: boolean;

  // Droit de supprimer un produit
  deleteProduct: boolean
}
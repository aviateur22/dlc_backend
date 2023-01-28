# dlc_backend

## Mise en place de la clean architecture
- Dossier Domain
  - Contient la logique métier de l'application
  - Les modèles métiers de l'application

- Dossier Infra
  - Contiendra l'implementation des absctractions
  - Des framworks
  - ...

## Vocabulaire

- visitor: personne qui n'est pas authentifiée
- user: personne authentifiée
- role: role de l'utilisateur
- product: un produits
- products: une liste de produit
- productImageUrl: image du produit
- productOpenDate: date d'ouverture d'un produit
- productOpenTime: temps d'ouverture d'un produit
- productCreate: Date d'ajout du produit
- account: compte d'un user
- friendEmail: email compte ami



## User Stories
| en tant que | je souhaite | afin de |
|---    |:-:    |:-:    |
| visiteur | pouvoir me connecter | de voir mes produits |
| visiteur | pouvoir m'inscrire | créer une liste de produits |
| utilisateur | pouvoir me déconnecter |ne plus être authentifié |
| utilisateur | pouvoir ajouter un produit | ajouter un produits à ma liste |
| utilisateur | pouvoir supprimer un produit | supprimer un produits de ma liste |
| utilisateur | pouvoir ajouter un ami | partager mes produits avec un autre utilisateur |
| utilisateur | pouvoir supprimer un ami | supprimer l'accés à un utilisateur à ma liste de produit |
| utilisateur | pouvoir voir les détails d'un ami | voir le profil de l'utilisateur |
| utilisateur | pouvoir récupérer tous mes amis | voir la liste de tous mes amis |
| utilisateur | modifier mon mot de passe | mettre a jour mon mot de passe |
| utilisateur | modifier mon image de profile | mettre a jour mon image |
| ami | pouvoir modifier les produits de mon ami| mettre a jour un produit |
| ami | pouvoir supprimer les produits de mon ami| supprimer un produit |



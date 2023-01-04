class UserModel {
  name: string;
  email: string;
  password: string;
  userImageUrl: string

  constructor(email: string, password: string, userImageUrl: string, name: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.userImageUrl = userImageUrl    
  }
}

export { UserModel }
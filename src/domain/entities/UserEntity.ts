class UserEntity {
  name: string;
  email: string;
  password: string;
  userImageUrl: string

  constructor(name: string, email: string, password: string, userImageUrl: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.userImageUrl = userImageUrl    
  }
}

export { UserEntity }
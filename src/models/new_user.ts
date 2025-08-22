export class NewUser {
  email: string;
  username: string;
  password: string;
  image: File;
  role: string;

  constructor(
    email: string,
    username: string,
    password: string,
    image: File,
    role: string
  ) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.image = image;
    this.role = role;
  }
}

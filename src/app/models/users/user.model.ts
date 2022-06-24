export class UserModel {

  id: any;
  username: string;
  email: string;
  role: string;
  tracks:any;

  // constructor(name: string, email: string, role: string) {
  //   this.username = name;
  //   this.email = email;
  //   this.role = role;
  // }

  constructor(name: string, email: string, role: string) {
    this.username = name;
    this.email = email;
    this.role = role;
  }

  toString() {
    console.log(this.username + this.email + this.role);
  }
}


export class UserModel {

  id: number;
    username: string;
    email: string;
    role: string;

  constructor(name: string, email: string, role: string){
      this.username = name;
      this.email = email;
      this.role = role;
    }
}

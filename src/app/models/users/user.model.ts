
export class UserModel {

  id: number;
    name: string;
    email: string;
    role: string;

  constructor(name: string, email: string, role: string){
      this.name = name;
      this.email = email;
      this.role = role;
    }
}

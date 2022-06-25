
export class UserRolesModel {

  id: number;
  role: string;

  constructor(id:number, role: string){
    this.role = role;
    this.id = id;
  }

  toString(){
    console.log(this.role + this.id);
  }
}

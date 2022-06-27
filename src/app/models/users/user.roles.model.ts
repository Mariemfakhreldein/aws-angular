
export class UserRolesModel {

  name: string;
  privileges: number[];

  constructor(name:string, privileges: number[]){
    this.privileges = privileges;
    this.name = name;
  }

}

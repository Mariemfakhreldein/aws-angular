export class RoleModel{

  id: number;
  name: string;
  privileges: string[];

  constructor(name: string, privilegeIds: number[]){
    this.name=name;
    this.privileges=privilegeIds;
  }


}

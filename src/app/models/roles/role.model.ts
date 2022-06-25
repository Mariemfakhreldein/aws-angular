import {PrivilegeModel} from "../privileges/privilege.model";

export class RoleModel{

  id:any;
  name:string;
  privileges:any[];
  constructor(name: string, privilegeIds: number[]){
    this.name=name;
    this.privileges=privilegeIds;
  }



}

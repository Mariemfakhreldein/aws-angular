import { Pipe, PipeTransform } from '@angular/core';
import {RoleModel} from "../../../../models/roles/role.model";

@Pipe({
  name: 'roleSearchByName'
})
export class RoleSearchByNamePipe implements PipeTransform {

  transform( filterString: RoleModel[],value: any): any {
    if(!filterString || !value){
      return filterString;
    }
    return  filterString.filter(role=>role.name.toLowerCase().indexOf(value.toLowerCase())!==-1);



  }


}

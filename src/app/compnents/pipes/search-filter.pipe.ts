import { Pipe, PipeTransform } from '@angular/core';
import {UserModel} from "../../models/users/user.model";

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform( filterString: UserModel[],value: any): UserModel[] {
    if(!filterString || !value){
      return filterString;
    }

    console.log("Value***"+value)
    return filterString.filter(user=>user.username.toLowerCase().indexOf(value.toLowerCase())!==-1);
  }




}

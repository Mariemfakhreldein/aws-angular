import { Pipe, PipeTransform } from '@angular/core';
import {UserModel} from "../../../models/users/user.model";

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform( filterString: UserModel[],value: any): any {
    if(!filterString || !value){
      return filterString;
    }
      return filterString.filter(user=>user.username.toLowerCase().indexOf(value.toLowerCase())).length==0? filterString.filter(user=>user.username.toLowerCase().indexOf(value.toLowerCase())!==-1) : filterString.filter(user=>user.email.toLowerCase().indexOf(value.toLowerCase())!==-1);



  }




}

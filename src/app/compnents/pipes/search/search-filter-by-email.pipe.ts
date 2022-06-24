import { Pipe, PipeTransform } from '@angular/core';
import {UserModel} from "../../../models/users/user.model";

@Pipe({
  name: 'searchFilterByEmail'
})
export class SearchFilterByEmailPipe implements PipeTransform {

  transform( filterString: UserModel[],value: any): UserModel[] {
    if(!filterString || !value){
      return filterString;
    }
    return filterString.filter(user=>user.email.toLowerCase().indexOf(value.toLowerCase())!==-1);
  }

}

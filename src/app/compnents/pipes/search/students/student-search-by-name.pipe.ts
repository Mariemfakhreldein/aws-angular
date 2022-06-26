import { Pipe, PipeTransform } from '@angular/core';
import {UserModel} from "../../../../models/users/user.model";
import {StudentModel} from "../../../../models/users/student.model";

@Pipe({
  name: 'studentSearchByName'
})
export class StudentSearchByNamePipe implements PipeTransform {

  transform( filterString: StudentModel[],value: any): any {
    if(!filterString || !value){
      return filterString;
    }
    return filterString.filter(student=>student.username.toLowerCase().indexOf(value.toLowerCase())).length==0? filterString.filter(student=>student.username.toLowerCase().indexOf(value.toLowerCase())!==-1) : filterString.filter(student=>student.email.toLowerCase().indexOf(value.toLowerCase())!==-1);
  }


}

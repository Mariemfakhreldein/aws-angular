import { Pipe, PipeTransform } from '@angular/core';
import {StudentModel} from "../../../../models/users/student.model";
import {StaffModel} from "../../../../models/users/staff.model";

@Pipe({
  name: 'staffSearchByName'
})
export class StaffSearchByNamePipe implements PipeTransform {

  transform( filterString: StaffModel[],value: any): any {
    if(!filterString || !value){
      return filterString;
    }
    return filterString.filter(staff=>staff.username.toLowerCase().indexOf(value.toLowerCase())).length==0? filterString.filter(staff=>staff.username.toLowerCase().indexOf(value.toLowerCase())!==-1) : filterString.filter(staff=>staff.email.toLowerCase().indexOf(value.toLowerCase())!==-1);
  }

}

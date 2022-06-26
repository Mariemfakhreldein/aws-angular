import { Pipe, PipeTransform } from '@angular/core';
import {IntakeModel} from "../../../../models/intake/intake.model";

@Pipe({
  name: 'intakeSearchByName'
})
export class IntakeSearchByNamePipe implements PipeTransform {

  transform( filterString: IntakeModel[],value: any): any {
    if(!filterString || !value){
      return filterString;
    }
    return  filterString.filter(intake=>intake.intakeName.toLowerCase().indexOf(value.toLowerCase())!==-1);

  }

}

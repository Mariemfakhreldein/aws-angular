import { Pipe, PipeTransform } from '@angular/core';
import {IntakeModel} from "../../../../models/intake/intake.model";
import {TrainingProgram} from "../../../../models/instances/training.program.model";

@Pipe({
  name: 'trainingProgramSearchByName'
})
export class TrainingProgramSearchByNamePipe implements PipeTransform {

  transform( filterString: TrainingProgram[],value: any): any {
    if(!filterString || !value){
      return filterString;
    }
    return  filterString.filter(trainingProgram=>trainingProgram.name.toLowerCase().indexOf(value.toLowerCase())!==-1);

  }

}

import { Pipe, PipeTransform } from '@angular/core';
import {BranchModel} from "../../../../models/branch/branch.model";

@Pipe({
  name: 'branchSearchByName'
})
export class BranchSearchByNamePipe implements PipeTransform {

  transform( filterString: BranchModel[],value: any): any {
    if(!filterString || !value){
      return filterString;
    }
    return  filterString.filter(branch=>branch.name.toLowerCase().indexOf(value.toLowerCase())!==-1);

  }

}

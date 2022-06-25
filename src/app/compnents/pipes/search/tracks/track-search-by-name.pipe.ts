import { Pipe, PipeTransform } from '@angular/core';
import {RoleModel} from "../../../../models/roles/role.model";
import {Track} from "../../../../models/instances/track.model";

@Pipe({
  name: 'trackSearchByName'
})
export class TrackSearchByNamePipe implements PipeTransform {

  transform( filterString: Track[],value: any): any {
    if(!filterString || !value){
      return filterString;
    }
    return  filterString.filter(track=>track.name.toLowerCase().indexOf(value.toLowerCase())!==-1);
  }

}

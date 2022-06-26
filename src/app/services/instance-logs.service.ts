import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class InstanceLogsService {

  constructor(private api: ApiService) { }

  getAllInstancesLogs(pageNo?:number, pageSize?:number){
    if (pageNo && pageSize) {
      return this.api.get(`/api/instancelogs?pn=${pageNo}&ps=${pageSize}`);
    }
    return this.api.get(`/api/instancelogs`);
  }
}

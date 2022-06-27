import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {InstanceCreateModel} from "../models/instances/instance.create.model";

@Injectable({
  providedIn: 'root'
})
export class InstanceService {

  constructor(private api: ApiService) { }

  createInstance(instanceCreateModel: InstanceCreateModel){
    return this.api.post("/api/instances", instanceCreateModel );
  }

  getAll(){
     return this.api.get("/api/instances");
  }

  startInstance(id:any){
    return this.api.post(`/api/instances/start/${id}`,null);
  }

  stopInstance(id:any){
    return this.api.post(`/api/instances/stop/${id}`,null);
  }

  getById(id:any){
    return this.api.get(`/api/instances/${id}`);
  }

  terminate(id) {
    return this.api.delete('/api/instances/delete/', id);
  }
}

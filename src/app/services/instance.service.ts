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

  getAllInstances(){
     return this.api.get("/api/instances");
  }

  startInstance(id:any){

    return this.api.get(`/api/instances/start/${id}`);

  }

  stopInstance(id:any){

    return this.api.get(`/api/instances/stop/${id}`);
  }

  getInstanceById(id:any){
    return this.api.get(`/api/instances/${id}`);
  }

}

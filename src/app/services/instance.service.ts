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
    return this.api.post(`/api/instances/start/${id}`,null);
  }

  stopInstance(id:any){
    return this.api.post(`/api/instances/stop/${id}`,null);
  }

  getInstanceById(id:any){
    return this.api.get(`/api/instances/${id}`);
  }

  getTrainingProgramsByBranch(branchId: any) {
    return this.api.get(`/api/branches/${branchId}/trainingPrograms`)
  }

  getIntakeByTrainingProgram(trainingProgramId:any) {
    return this.api.get(`/api/trainingPrograms/${trainingProgramId}/intakes`)

  }

  getTrackByIntake(intakeId: any) {
    return this.api.get(`/api/intakes/${intakeId}/tracks`)
  }

  getIntakes() {
    return this.api.get("/api/intakes")
  }

  getStudentsByTrack(trackId) {
    return this.api.get(`/api/tracks/${trackId}/students`)
  }

  terminate(id) {
    return this.api.delete(`/api/instances/delete/`, id);
  }
}

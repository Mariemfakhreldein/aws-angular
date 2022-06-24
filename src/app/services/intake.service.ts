import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {InstanceCreateModel} from "../models/instances/instance.create.model";
import {IntakeModel} from "../models/intake/intake.model";
import {IntakePostModel} from "../models/intake/intake.post.model";

@Injectable({
  providedIn: 'root'
})
export class IntakeService {

  constructor(private api: ApiService) { }

  getAllBranches(){
    return this.api.get("/api/branches");
  }
  getAllIntakes(){
    return this.api.get("/api/intakes")
  }

  getTrainingProgramsByBranch(branchId: any) {
    return this.api.get(`/api/branches/${branchId}/trainingPrograms`);
  }

  createIntake(intakeModel: IntakePostModel){
    return this.api.post("/api/intakes", intakeModel );
  }

  getTrainingProgrammById(trainingProgrammId: any){
    return this.api.get(`/api/trainingPrograms/${trainingProgrammId}`)
  }

  getIntakeByTrainingProgram(trainingProgramId:any) {
    return this.api.get(`/api/trainingPrograms/${trainingProgramId}/intakes`)

  }


}

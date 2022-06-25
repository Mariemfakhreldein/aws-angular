
import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {InstanceCreateModel} from "../models/instances/instance.create.model";
import {IntakeModel} from "../models/intake/intake.model";
import {IntakePostModel} from "../models/intake/intake.post.model";
import {IntakePutModel} from "../models/intake/intake.put.model";

@Injectable({
  providedIn: 'root'
})
export class IntakeService {

  constructor(private api: ApiService) { }


  getAllIntakes(){
    return this.api.get("/api/intakes")
  }

  createIntake(intakeModel: IntakePostModel){
    return this.api.post("/api/intakes", intakeModel );
  }



  getIntakeById(intakeId:any){
    return this.api.get(`/api/intakes/${intakeId}`)
  }

  updateIntake(intakeModel: IntakePutModel){
    return this.api.update(`/api/intakes/${intakeModel.id}`,intakeModel);
  }

  getIntakeByTrainingProgram(trainingProgramId:any) {
    return this.api.get(`/api/trainingPrograms/${trainingProgramId}/intakes`)

  }

}

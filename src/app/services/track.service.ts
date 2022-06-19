import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private api: ApiService) { }

  getAllBranches(){
    return this.api.get("/api/branches");
  }

  getIntakes() {
    return this.api.get("/api/intakes")
  }

  getTrainingProgramsByBranch(branchId: any) {
    return this.api.get(`/api/branches/${branchId}/trainingPrograms`)
  }

  getIntakeByTrainingProgram(trainingProgramId:any) {
    return this.api.get(`/api/trainingPrograms/${trainingProgramId}/intakes`)

  }
}

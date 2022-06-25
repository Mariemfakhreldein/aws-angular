import { Injectable } from '@angular/core';
import { TrainingProgram } from '../models/instances/training.program.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingProgramService {

  constructor(private api: ApiService) { }

  create(trainingProgram: TrainingProgram){
    return this.api.post("/api/trainingPrograms",trainingProgram );
  }

  getAll(){
    return this.api.get("/api/trainingPrograms");
  }

  update(trainingProgram: TrainingProgram){
    return this.api.update(`/api/trainingPrograms/${trainingProgram.id}`, {'name':trainingProgram.name});
  }

  getById(trainingProgramId: number){
    return this.api.get(`/api/trainingPrograms/${trainingProgramId}`);
  }

  getTrainingProgramsByBranch(branchId: any) {
    return this.api.get(`/api/branches/${branchId}/trainingPrograms`)

  }

}

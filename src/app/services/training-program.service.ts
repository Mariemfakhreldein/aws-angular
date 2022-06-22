import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { TrainingProgram } from './../models/instances/training.program.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingProgramService {

  constructor(private api: ApiService) { }

  create(trainingProgram: TrainingProgram){
    return this.api.post("/api/trainingPrograms",trainingProgram );
  }


}

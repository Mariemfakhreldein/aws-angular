import { Component, OnInit } from '@angular/core';
import { TrainingProgram } from 'src/app/models/instances/training.program.model';
import { TrainingProgramService } from 'src/app/services/training-program.service';

@Component({
  selector: 'app-view-training-programs',
  templateUrl: './view-training-programs.component.html',
  styleUrls: ['./view-training-programs.component.css']
})
export class ViewTrainingProgramsComponent implements OnInit {
  trainingPrograms: TrainingProgram[]=[];
  page=1;
  searchValue: any;

  constructor(private trainingProgramService:TrainingProgramService) { }

  ngOnInit(): void {

    this.getAllTrainingPrograms();
  }

  getAllTrainingPrograms(){
    this.trainingProgramService.getAll().subscribe(
      {
        next: (data: any) => {
          data.trainingPrograms.forEach(e => {
              this.trainingPrograms.push(e);
            }
          )
        },
        error: (e) => {},
      });

  }
}

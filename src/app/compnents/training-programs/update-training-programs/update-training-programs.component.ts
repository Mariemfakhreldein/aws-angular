import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TrainingProgram } from 'src/app/models/instances/training.program.model';
import { TrainingProgramService } from 'src/app/services/training-program.service';

@Component({
  selector: 'app-update-training-programs',
  templateUrl: './update-training-programs.component.html',
  styleUrls: ['./update-training-programs.component.css']
})

export class UpdateTrainingProgramsComponent implements OnInit {
  myGroup: FormGroup = new FormGroup({});
  trainingProgram: TrainingProgram = new TrainingProgram();
  trainingProgramName: string;
  isSuccess = false;
  isLoading = true;

  trainingProgramId:number;

  successMessage = 'training program is updated successfully';
  failMessage = 'Something goes wrong'

  constructor(private formBuilder: FormBuilder,
    private trainingProgramService: TrainingProgramService,
    private _activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap
    .subscribe(
      parms => {
        this.trainingProgramId = +parms.get('id');
        this.getTrainingProgramById();
      }
    );

    this.myGroup = this.formBuilder.group({
      trainingProgramName: ['', [Validators.required]],
    });

  }

  private getTrainingProgramById() {
    this.trainingProgramService.getById(this.trainingProgramId).subscribe(
      {
        next: (data: any) =>
        {
          this.trainingProgram.id = data.id;
          this.trainingProgram.name = data.name;
          this.trainingProgramName = data.name
        }
      }
    );
  }


  submit() {
    this.trainingProgram.name = this.trainingProgramName.trim();
    this.trainingProgramService.update(this.trainingProgram).subscribe({
      next: (data:any) =>{
        this.changeSuccessAndLoading(false, true);
      },
      error: (e) => {
        this.changeSuccessAndLoading(false, false);
      },
    });
  }

  getIsSuccess(): boolean {
    return this.isSuccess;
  }

  changeSuccessAndLoading(loading: boolean, success:boolean){
    this.isLoading = loading;
    this.isSuccess = success;
  }
}

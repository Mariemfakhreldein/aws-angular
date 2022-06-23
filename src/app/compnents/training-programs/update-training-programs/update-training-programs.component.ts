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
  currentItem = 'trainingProgram';
  trainingProgramId:number;

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
      trainingProgramName: [this.trainingProgram.name, [Validators.required]],
    });
  }

  private getTrainingProgramById() {
    this.trainingProgramService.getById(this.trainingProgramId).subscribe(
      {
        next: (data: any) =>
        {
          this.trainingProgram.branchId = data.branchId;
          this.trainingProgram.id = data.id;
          this.trainingProgram.name = data.name;
        }
      }
    );
  }


  submit() {

    this.trainingProgram.name = this.trainingProgramName.trim();
    // this.trainingProgram.branchId = +this.branchId;
    console.table(this.trainingProgram);
    this.trainingProgramService.update(this.trainingProgram).subscribe({
      next: (data:any) =>{

        this.isLoading=false;
        this.isSuccess=true;

      },
      error: (e) => { this.isLoading=false;this.isSuccess=false},
    });
  }

  getIsSuccess(): boolean {
    return this.isSuccess;
  }
}

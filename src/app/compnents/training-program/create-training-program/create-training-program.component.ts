import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchModel } from 'src/app/models/branch/branch.model';
import { TrainingProgram } from 'src/app/models/instances/training.program.model';
import { BranchService } from 'src/app/services/branch.service';
import { TrainingProgramService } from 'src/app/services/training-program.service';

@Component({
  selector: 'app-create-training-program',
  templateUrl: './create-training-program.component.html',
  styleUrls: ['./create-training-program.component.css']
})
export class CreateTrainingProgramComponent implements OnInit {

  myGroup: FormGroup = new FormGroup({});
  branches: BranchModel[] = [];
  trainingProgram: TrainingProgram = new TrainingProgram();
  trainingProgramName: string;
  branchId: string;
  isSuccess = false;
  isLoading = true;
  currentItem = 'trainingProgram';

  constructor(private formBuilder: FormBuilder,
    private trainingProgramService: TrainingProgramService,
    private branchService: BranchService) { }

  ngOnInit(): void {
    this.myGroup = this.formBuilder.group({
      branches: ["", [Validators.required]],
      trainingProgramName: ["", [Validators.required]],
    });
    this.getAllBranches();
  }

  private getAllBranches() {
    this.branchService.getAll().subscribe(
      {
        next: (data: any) => {

          data.branchResponsesList.forEach(branch => {

            console.table("branch" + branch);

            this.branches.push(branch);
          }
          )
        }
      }
    );
  }


  submit() {

    console.log(this.branchId);
    this.trainingProgram.name = this.trainingProgramName.trim();
    this.trainingProgram.branchId = +this.branchId;
    console.table(this.trainingProgram);
    this.trainingProgramService.create(this.trainingProgram).subscribe({
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

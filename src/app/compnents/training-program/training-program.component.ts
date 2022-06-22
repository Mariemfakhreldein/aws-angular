import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchModel } from 'src/app/models/branch/branch.model';
import { TrainingProgram } from 'src/app/models/instances/training.program.model';
import { TrainingProgramService } from './../../services/training-program.service';
import { BranchService } from './../../services/branch.service';

@Component({
  selector: 'app-training-program',
  templateUrl: './training-program.component.html',
  styleUrls: ['./training-program.component.css']
})

export class TrainingProgramComponent implements OnInit {

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

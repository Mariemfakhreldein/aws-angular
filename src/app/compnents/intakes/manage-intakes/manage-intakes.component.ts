import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BranchModel} from "../../../models/branch/branch.model";
import {TrainingProgram} from "../../../models/instances/training.program.model";
import {IntakeService} from "../../../services/intake.service";
import {BranchPostModel} from "../../../models/branch/branch.post.model";
import {IntakeModel} from "../../../models/intake/intake.model";
import {IntakePostModel} from "../../../models/intake/intake.post.model";

@Component({
  selector: 'app-manage-intakes',
  templateUrl: './manage-intakes.component.html',
  styleUrls: ['./manage-intakes.component.css']
})
export class ManageIntakesComponent implements OnInit {

  myGroup: FormGroup = new FormGroup({});
  branches: BranchModel[] = [];
  trainingPrograms: TrainingProgram[] = [];
  intakePost = new IntakePostModel();

  intakeName: any;
  intakeDescription: any;

  isLoading: boolean = true;
  @Output() isSuccess = false;
  currentItem: string = "Intake";

  constructor(private formBuilder: FormBuilder,
              private intakeService: IntakeService,) {}

  ngOnInit(): void {
    this.myGroup = this.formBuilder.group({
      branches: ["", [Validators.required]],
      trainingPrograms: ["", [Validators.required]],
      intakeName: ["", [Validators.required]],
      intakeDescription: ["", [Validators.required]]
    });
    this.getAllBranches();

    this.myGroup.get('branches').valueChanges.subscribe((value)=>{
      this.myGroup.get('trainingPrograms').setValue(null);

    })



  }

  private getAllBranches() {
    this.intakeService.getAllBranches().subscribe(
      {
        next: (data: any) => {
          data.branchResponsesList.forEach(e => {
              this.branches.push(e);
              console.log("brrrrrrrrrrr"+this.branches)
            }
          )
        }


      }
    );
  }

  onChangeBranch(branchId: any) {


    this.trainingPrograms=[];
    if(branchId !=null){
      this.intakeService.getTrainingProgramsByBranch(branchId).subscribe(
        {
          next: (data: any) => {
            data.trainingPrograms.forEach(e => {
                this.trainingPrograms.push(e);
              }
            )
          }

        }
      );
    }

  }

  onChangeTrainingProgram(trainingProgramId: any) {
    this.intakePost.trainingProgramId = trainingProgramId;
  }


  submitBtn() {
    this.intakePost.intakeName = this.intakeName;
    this.intakePost.intakeDescription = this.intakeDescription;
    this.CreateIntake(this.intakePost);
  }

  CreateIntake(model: IntakePostModel) {
    this.intakeService.createIntake(model).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.isSuccess = true;
      }, (error: any) => {
        this.isLoading = false;
        this.isSuccess = false;
      }
    )
  }


}

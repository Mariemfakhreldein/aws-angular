import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BranchModel} from "../../../models/branch/branch.model";
import {TrainingProgram} from "../../../models/instances/training.program.model";
import {IntakeService} from "../../../services/intake.service";
import {IntakePostModel} from "../../../models/intake/intake.post.model";
import {BranchService} from "../../../services/branch.service";
import {TrainingProgramService} from "../../../services/training-program.service";
import {TrackService} from "../../../services/track.service";

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
  successMessage = 'intake is created successfully';
  failMessage = 'Something goes wrong'

  constructor(private formBuilder: FormBuilder,
              private intakeService: IntakeService,
              private branchService:BranchService,
              private trainingProgramService:TrainingProgramService) {}

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
    this.branchService.getAll().subscribe(
      {
        next: (data: any) => {
          data.branchResponsesList.forEach(e => {
              this.branches.push(e);
            }
          )
        }
      }
    );
  }

  onChangeBranch(branchId: any) {
    this.trainingPrograms=[];
    if(branchId !=null){
      this.trainingProgramService.getTrainingProgramsByBranch(branchId).subscribe(
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
    this.intakeService.create(model).subscribe(
      (response: any) => {
        this.emptyFields();
        this.changeSuccessAndLoading(false, true);
      }, (error: any) => {
        this.emptyFields();
        this.changeSuccessAndLoading(false, false);
      }
    )
  }

  emptyFields(){
    this.myGroup.reset();
  }

  changeSuccessAndLoading(loading: boolean, success:boolean){
    this.isLoading = loading;
    this.isSuccess = success;
  }

}

import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BranchModel} from "../../../models/branch/branch.model";
import {TrainingProgram} from "../../../models/instances/training.program.model";
import {IntakeService} from "../../../services/intake.service";
import {BranchPostModel} from "../../../models/branch/branch.post.model";
import {IntakeModel} from "../../../models/intake/intake.model";
import {IntakePostModel} from "../../../models/intake/intake.post.model";
import {BranchService} from "../../../services/branch.service";
import {TrainingProgramService} from "../../../services/training-program.service";
import {Track} from "../../../models/instances/track.model";
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
  currentItem: string = "Intake";

  action="Created";

  constructor(private formBuilder: FormBuilder,
              private intakeService: IntakeService,
              private branchService:BranchService,
              private trainingProgramService:TrainingProgramService,
              private trackService:TrackService) {}

  ngOnInit(): void {
    this.myGroup = this.formBuilder.group({
      branches: ["", [Validators.required]],
      trainingPrograms: ["", [Validators.required]],
      intakeName: ["", [Validators.required]],
      intakeDescription: ["", [Validators.required]]
    });
    this.getAllBranches();

    this.myGroup.get('branches').valueChanges.subscribe((value)=>{
      this.myGroup.get('trainingPrograms').setValue("");

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
        this.isLoading = false;
        this.isSuccess = true;
      }, (error: any) => {
        this.isLoading = false;
        this.isSuccess = false;
      }
    )
  }


}

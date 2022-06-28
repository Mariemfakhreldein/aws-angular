import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BranchModel} from "../../../models/branch/branch.model";
import {Track} from "../../../models/instances/track.model";
import {Intake} from "../../../models/instances/intake.model";
import {UserService} from "../../../services/user.service";
import {TemplateService} from "../../../services/template.service";
import {InstanceService} from "../../../services/instance.service";
import {TrainingProgram} from "../../../models/instances/training.program.model";
import {TrackService} from "../../../services/track.service";
import {distinctUntilChanged} from "rxjs";
import {BranchService} from "../../../services/branch.service";
import {TrainingProgramService} from "../../../services/training-program.service";
import {IntakeService} from "../../../services/intake.service";

@Component({
  selector: 'app-manage-tracks',
  templateUrl: './manage-tracks.component.html',
  styleUrls: ['./manage-tracks.component.css']
})
export class ManageTracksComponent implements OnInit {

  myGroup: FormGroup = new FormGroup({});
  branches:BranchModel[]=[];
  trainingPrograms:TrainingProgram[]=[];
  intakes:Intake[]=[];
  track:Track=new Track();
  trackName: any;
  isSuccess=false;
  isLoading=true;
  successMessage = 'track is created successfully';
  failMessage = 'Something goes wrong';
  selectedTrainingProgram: any="";


  constructor(private formBuilder: FormBuilder,
              private templateService: TemplateService,
              private trackService: TrackService,
              private branchService: BranchService,
              private trainingProgramService: TrainingProgramService,
              private intakeService: IntakeService) { }

  ngOnInit(): void {

    this.myGroup=this.formBuilder.group({
      branches:["",[Validators.required]],
      trainingPrograms:["",[Validators.required]],
      intakes:["",[Validators.required]],
      trackName:["",[Validators.required]],
    });

    this.myGroup.get('branches').valueChanges.subscribe((value)=>{
      this.myGroup.get('trainingPrograms').setValue("");

    })
    this.myGroup.get('trainingPrograms').valueChanges.subscribe((value)=>{
      this.myGroup.get('intakes').setValue("");

    })
    this.getAllBranches();
  }

  private getAllBranches() {
    this.branchService.getAll().subscribe(
      {
        next: (data: any) => {

          data.branchResponsesList.forEach(e => {
              this.branches.push(e);
            }
          )
        },
        error: (e) => {},});
  }

  onChangeBranch(branchId:any) {
    this.trainingPrograms = [];
    this.selectedTrainingProgram="";
    this.trainingProgramService.getTrainingProgramsByBranch(branchId).subscribe(
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

  onChangeTrainingProgram() {
    this.intakes = [];
    this.intakeService.getIntakeByTrainingProgram(this.selectedTrainingProgram).subscribe({

      next: (data: any) => {
          data.intakeResponsesList.forEach(e => {
              this.intakes.push(e);
            }
          )
        },
      error: (e) => {},
    });

  }

  onChangeIntake(intakeId: any) {
    this.track.intakeId=intakeId;
  }

  submit() {
    this.track.name=this.trackName;
    this.trackService.create(this.track).subscribe({
      next: (data:any) =>{
        this.emptyFields();
        this.changeSuccessAndLoading(false, true);
      },
      error: (e) => {
        this.emptyFields();
        this.changeSuccessAndLoading(false, false);
      },
    });
  }

  getIsSuccess(): boolean{
    return this.isSuccess;
  }

  emptyFields(){
    this.myGroup.reset();
  }

  changeSuccessAndLoading(loading: boolean, success:boolean){
    this.isLoading = loading;
    this.isSuccess = success;
  }

}

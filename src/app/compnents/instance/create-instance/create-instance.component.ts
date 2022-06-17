import { Component, OnInit } from '@angular/core';
import {InstanceModel} from "../../../models/instances/instance.models";
import {TemplateModel} from "../../../models/templates/template.model";
import {UserModel} from "../../../models/users/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {UserService} from "../../../services/user.service";
import {TemplateService} from "../../../services/template.service";
import {TemplateResponseModel} from "../../../models/templates/template.response.model";
import {InstanceCreateModel} from "../../../models/instances/instance.create.model";
import {InstanceService} from "../../../services/instance.service";
import {compareNumbers} from "@angular/compiler-cli/src/version_helpers";
import {BranchModel} from "../../../models/branch/branch.model";
import {TrainingProgram} from "../../../models/instances/training.program.model";
import {Intake} from "../../../models/instances/intake.model";
import {Track} from "../../../models/instances/track.model";

@Component({
  selector: 'app-create-instance',
  templateUrl: './create-instance.component.html',
  styleUrls: ['./create-instance.component.css']
})
export class CreateInstanceComponent implements OnInit {
  // createInstance:Instance;
  // instanceFormGroup: FormGroup = new FormGroup({});
  students: UserModel[] = [];
  templates: TemplateResponseModel[] = [];
  templateId: number;
  isSuccess=false;
  currentItem='instance';
  branches:BranchModel[]=[];
  trainingPrograms:TrainingProgram[]=[];
  intakes:Intake[]=[];
  tracks:Track[] = [];

  myGroup: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private templateService: TemplateService,
              private instanceService: InstanceService) {
  }

  ngOnInit(): void {
    this.myGroup=this.formBuilder.group({
      instanceName:["",[Validators.required]],
      instanceTemplate:["",[Validators.required]],
      instanceKeyPair:["",[Validators.required]],
      branches:[],
      trainingPrograms:[],
      intakes:[],
      tracks:[]
    });

    // this.getAllStudents();

    this.getAllIntakes();
    this.getAllBranches();
    this.getAllTemplates();
  }
  submitBtn(instanceName: string, keyPairName: string, studentId: number) {
    console.log(studentId);

    let studentIds:number[] = [studentId];

    let instanceModel = new InstanceCreateModel(instanceName, keyPairName, studentIds, this.templateId);
    this.instanceService.createInstance(instanceModel).subscribe(
      (response:any)=>{
          // console.log("success instance");
          this.isSuccess=true;
      }, (error: any)=>{
        // console.log(error);
        // console.log("fail instance");
        this.isSuccess=false;
      }
    )
  }

  private getAllStudents(){
    this.userService.getAllStudents().subscribe(
      (response:any)=>{
        console.log(response.userResponsesList)
        this.students = response.userResponsesList;
      },(error:any)=>{
           console.log(error);
      }
    )
  }

  private getAllTemplates(){
    this.templateService.getAllTemplates().subscribe(
      (response:any)=>{
        console.log(response.templateResponseList)
        this.templates = response.templateResponseList;
      },(error:any)=>{
        console.log(error);
      }
    )
  }

  changeTemplateId(event: any){
    this.templateId = event.target.value;
    console.log(event.target.value);
  }

  getIsSuccess(): boolean{
    return this.isSuccess;
  }

  onChangeBranch(branchId:any) {

    console.log("on change" + branchId);
    this.instanceService.getTrainingProgramsByBranch(branchId).subscribe(
      {
        next: (data: any) => {

          data.trainingPrograms.forEach(e => {

              console.log( "trainingPrograms" + e);

              this.trainingPrograms.push(e);
            }
          )
        }

      }
    )

  }

  private getAllBranches() {

    this.instanceService.getAllBranches().subscribe(
      {
        next: (data: any) => {

          data.branchResponsesList.forEach(e => {

              console.log( "eeee" + e);

              this.branches.push(e);
            }
          )
        }


      }

      );
    console.log( "bbbbbbbbranches" + this.branches);
  }

  onChangeTrainingProgram(trainingProgramId:any) {

  }

  onChangeIntake(intakeId: any) {
      console.log("++++"  + intakeId)
    this.instanceService.getTrackByIntake(intakeId).subscribe(
      {
        next: (data: any) => {
          data.trackResponsesList.forEach(e => {

              console.log( "trainingPrograms" + e);

              this.tracks.push(e);
            }
          )
        }

      }
    )
  }

  onChangeTrack(trackId: any) {
    this.instanceService.getStudentsByTrack(trackId).subscribe({

      next: (data: any) => {

        data.userResponsesList.forEach(e => {

            console.log("eeee" + e);

            this.students.push(e);
          }
        )
      }

    })
  }

  private getAllIntakes() {
     this.instanceService.getIntakes().subscribe({
       next: (data: any) => {

         data.intakeResponsesList.forEach(e => {

             console.log("eeee" + e);

             this.intakes.push(e);
           }
         )
       }
     }
  );
  }
}

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
  isLoading=true;
  myGroup: FormGroup = new FormGroup({});

  private selectedItemsList: any[]=[] ;
  isChecked: any[]=[];

  isStudentSelected=true;

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

    this.getAllStudents();

    this.getAllIntakes();
    this.getAllBranches();
    this.getAllTemplates();
  }
  submitBtn(instanceName: string, keyPairName: string, timeToLiveInMinutes:number) {



   let myList=this.fetchSelectedItems();
   let studentIdList:number[] = [];
    for(let i=0; i<myList.length; i++){
      studentIdList.push(myList[i].id);
      console.log("slected studentsss "+myList[i].username);
      console.log("slected studentsss "+myList[i].id);
      console.log("slected studentsss "+myList[i].email);
    }
    console.log("student id list" + studentIdList);
    console.log("instanceName "+instanceName);
    console.log("keyPairName "+keyPairName);
    console.log("timeToLiveInMinutes "+timeToLiveInMinutes);

    let instanceModel = new InstanceCreateModel(instanceName, keyPairName, studentIdList, this.templateId, timeToLiveInMinutes);
    this.instanceService.createInstance(instanceModel).subscribe(
      (response:any)=>{
          // console.log("success instance");
        this.isLoading=false;
          this.isSuccess=true;
      }, (error: any)=>{
        // console.log(error);
        // console.log("fail instance");
        this.isLoading=false;
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
              this.isStudentChecked();
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

  isStudentChecked(){
    this.isChecked = [];
    for(let i=0; i<this.students.length;i++){
      if (this.selectedItemsList[i].username === this.students[i].username){
        this.isChecked.push(true);
      }else{
        this.isChecked.push(false);
      }
    }
  }



  private fetchSelectedItems() {
    this.selectedItemsList=[];
    for (let i=0 ; i<this.isChecked.length ; i++){
      if(this.isChecked[i] == true){
        this.selectedItemsList.push(this.students[i]);
      }
    }
    return this.selectedItemsList;
  }






}

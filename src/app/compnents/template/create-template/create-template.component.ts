import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {TemplateService} from "../../../services/template.service";
import {parseJson} from "@angular/cli/utilities/json-file";
import {Observable} from "rxjs";
import {TemplateModel} from "../../../models/templates/template.model";
import {newArray} from "@angular/compiler/src/util";
import {InstanceTypeModel} from "../../../models/templates/instanceType.model";
import {SubnetModel} from "../../../models/templates/subnet.model";
import {AmiModel} from "../../../models/templates/ami.model";
import {SecurityGroupsModel} from "../../../models/templates/securityGroups.model";

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css'],
})
export class CreateTemplateComponent implements OnInit {

  templateFormGroup: FormGroup = new FormGroup({});
  submitted: boolean=false;

  subnets:SubnetModel[];
  securityGroups:SecurityGroupsModel[];
  instanceTypes:InstanceTypeModel[];

  model = new TemplateModel();
  amiFlag:boolean = false;

  private selectedItemsList: any[]=[] ;
  isChecked: any[]=[];

  isSecurityGroupsSelected=true;

  constructor(private _formBuilder:FormBuilder,
              private route:Router,
              private templateService: TemplateService,
              private activatedRouter: ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.templateFormGroup=this._formBuilder.group({
      subnet:["",[Validators.required]],
      ami:["ami-0022f774911c1d690",[Validators.required]],
      instance:["",[Validators.required]],
    });
    this.getSubnet();
    this.getInstanceType();
  }

  getSubnet(){
    this.templateService.getSubnet().subscribe(
      (response:any)=>{

            this.subnets = response.subnetList;
          },(error:any)=>{
            console.log("fail Hello", error);
          }
    )

  }

  onChangeSubnet(vpc: any) {
    if (vpc != "") {
      this.templateService.getSecurityGroups(vpc).subscribe(
        (response:any)=>{
          console.log("success security groups", response.securityGroupResponseList);
          this.securityGroups = response.securityGroupResponseList;
          this.isSecurityGroupsListChecked();
        },(error:any)=>{
          console.log("fail security groups", error);
        }
      )
    }

  }

  getAMI(amiString:string) : boolean{
    if (amiString != "") {
      let amiModel = new AmiModel();
      amiModel.amiId = amiString;
      this.templateService.getAmi(amiModel).subscribe(
        (response:any)=>{
          this.amiFlag = response.success;
          if(this.amiFlag){
              this.submit();
          }else{
             alert("enter a valid ami please  ");
          }
        },(error:any)=>{
          console.log("fail ami", error);
        }
      )
    }
    return this.amiFlag;
  }
  getInstanceType(){
    this.templateService.getInstancesTypes().subscribe(
      (response:any)=>{
        console.log("success types", response.instanceTypeResponseList);
        this.instanceTypes = response.instanceTypeResponseList;
      },(error:any)=>{
        console.log("fail types", error);
      }
    )

  }

  submitBtn() {
    if(this.fetchSelectedItems().length === 0 ){
      this.isSecurityGroupsSelected=false;

    }else{
      let txt = JSON.stringify(this.templateFormGroup.value);
      let templateModel = JSON.parse(txt);

      this.getAMI(templateModel.ami);
      this.model.amiId = templateModel.ami;
      this.model.subnetId = templateModel.subnet;
      this.model.securityGroups = this.selectedItemsList;
      this.model.instanceType = templateModel.instance;

        // alert("Template Details " + "Subnet: " + model.subnetId + "AMI: " + model.amiId + "Security Groups: "+ model.securityGroups + "Instance Type: " +model.instanceType);

        // this.templateService.add(model).subscribe(
        // (response:any)=>{
        //   console.log("success added");
        //   this.instanceTypes = response.instanceType;
        // },(error:any)=>{
        //   console.log("fail to add", error);
        // }
      //)

    }
  }

  submit(){
    console.log("here " + this.amiFlag);
  }



  isSecurityGroupsListChecked(){
    this.isChecked = [];
    for(let i=0; i<this.securityGroups.length;i++){
      this.isChecked.push(false);
    }
  }

  private fetchSelectedItems() {
    this.selectedItemsList=[];
    for (let i=0 ; i<this.isChecked.length ; i++){
        if(this.isChecked[i] == true){
          this.selectedItemsList.push(this.securityGroups[i]);
        }
    }
   return this.selectedItemsList;
  }
}

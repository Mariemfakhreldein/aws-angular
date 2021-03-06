import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TemplateService} from "../../../services/template.service";
import {TemplateModel} from "../../../models/templates/template.model";
import {InstanceTypeModel} from "../../../models/templates/instanceType.model";
import {SubnetModel} from "../../../models/templates/subnet.model";
import {AmiModel} from "../../../models/templates/ami.model";
import {SecurityGroupsModel} from "../../../models/templates/securityGroups.model";
import {TemplateResponseModel} from "../../../models/templates/templateResponse.model";

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css'],
})
export class CreateTemplateComponent implements OnInit {


  isLoading:boolean=true;

  templateFormGroup: FormGroup = new FormGroup({});
  submitted: boolean=false;

  subnets:SubnetModel[];
  securityGroups:SecurityGroupsModel[];
  instanceTypes:InstanceTypeModel[];
  templateResponseModel:TemplateResponseModel;

  model = new TemplateModel();
  amiFlag:boolean = false;

  private selectedItemsList: any[]=[] ;
  isChecked: any[]=[];

  isSecurityGroupsSelected=true;

  @Output() isSuccess=false;

  successMessage = 'template is created successfully';
  failMessage = 'Something goes wrong';

  constructor(private _formBuilder:FormBuilder,
              private route:Router,
              private templateService: TemplateService,
              private activatedRouter: ActivatedRoute) { }

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
      }
    )
  }

  onChangeSubnet(vpc: any) {
    if (vpc.vpcId != "") {
      this.templateService.getSecurityGroups(vpc).subscribe(
        (response:any)=>{
          this.securityGroups = response.securityGroupResponseList;
          this.isSecurityGroupsListChecked();
        },(error:any)=>{
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
          }
        },(error:any)=>{
        }
      )
    }
    return this.amiFlag;
  }

  getInstanceType(){
    this.templateService.getInstancesTypes().subscribe(
      (response:any)=>{

        this.instanceTypes = response.instanceTypeResponseList;
      },(error:any)=>{
      }
    )

  }
  submitBtn() {
    if(this.fetchSelectedItems().length === 0 ){
      this.isSecurityGroupsSelected=false;

    }else{
      let txt = JSON.stringify(this.templateFormGroup.value);
      let templateModel = JSON.parse(txt);
      this.model.amiId = templateModel.ami;
      this.model.subnetId = this.getSubnetIdByVpc(templateModel.subnet);
      this.model.securityGroups = this.selectedItemsList.map(value => {return value.securityGroupId});
      this.model.instanceType = templateModel.instance;
      this.submit();
    }
  }

  submit(){
    this.templateService.create(this.model).subscribe(
    (response:any)=>{
      this.emptyFields();
      this.changeSuccessAndLoading(false, true);
    },(error:any)=>{
        this.emptyFields();
        this.changeSuccessAndLoading(false, false);
    }
    )
  }

  isSecurityGroupsListChecked(){
    this.isChecked = [];
    for(let i=0; i<this.securityGroups.length;i++){
      if (this.securityGroups[i].name === "default"){
        this.isChecked.push(true);
      }else{
        this.isChecked.push(false);
      }
    }
  }

   fetchSelectedItems() {
    this.selectedItemsList=[];
    for (let i=0 ; i<this.isChecked.length ; i++){
        if(this.isChecked[i] == true){
          this.selectedItemsList.push(this.securityGroups[i]);
        }
    }
   return this.selectedItemsList;
  }

  getSubnetIdByVpc(vpc:string): string{
    for (let i of this.subnets){
     if(i.vpcId === vpc){
       return i.subnetId
     }
    }
    return null;
  }

   getIsSuccess(): boolean{
    return this.isSuccess;
  }

  emptyFields(){
    this.isChecked = [];
    this.selectedItemsList = [];
  }

  changeSuccessAndLoading(loading: boolean, success:boolean){
    this.isLoading = loading;
    this.isSuccess = success;
  }
}



import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {TemplateService} from "../../../services/template.service";
import {parseJson} from "@angular/cli/utilities/json-file";
import {Observable} from "rxjs";
import {TemplateModel} from "../../../models/templates/template.model";

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css'],
})
export class CreateTemplateComponent implements OnInit {

  templateFormGroup: FormGroup = new FormGroup({});
  submitted: boolean=false;

  subnets:string[];
  securityGroups:string[];
  instanceTypes:string[];
  amiFlag:boolean = false;

  constructor(private _formBuilder:FormBuilder,
              private route:Router,
              private templateService: TemplateService,
              private activatedRouter: ActivatedRoute
              ,private http: HttpClient,
              private authService: AuthService,
              ) { }

  ngOnInit(): void {
    this.templateFormGroup=this._formBuilder.group({
      subnet:["",[Validators.required]],
      security:[""],
      ami:["ami-0022f774911c1d690",[Validators.required]],
      instance:["",[Validators.required]],
    });
    this.getSubnet();
    this.getInstanceType();
  }

  getSubnet(){
    this.templateService.getSubnet().subscribe(
      (response:any)=>{
            console.log("success Hello", response.subnets);
            this.subnets = response.subnets;
            console.log("success Hello", this.subnets);
          },(error:any)=>{
            console.log("fail Hello", error);
          }
    )

    this.securityGroups = this.templateService.getAllSecurityGroups();
  }

  onChangeSubnet(subnet: any) {
    // if (subnet != "") {
    //   console.log("subnet" + subnet);
    //   const headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.authService.jwt)
    //   this.http.get<Response>(`http://localhost:4545/api/template/${subnet}`, {headers:headers}).subscribe(
    //     (response:any)=>{
    //       console.log("success Hello", response);
    //     },(error)=>{
    //       console.log("fail Hello", error);
    //     }
    //   )
    // }

  }

  getAMI(amiString:string){
    if (amiString != "") {
      console.log("subnet" + amiString);
      const headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.authService.jwt)
      this.http.get<Response>(`http://localhost:4545/api/template/ami/${amiString}`, {headers:headers}).subscribe(
        (response:any)=>{
          console.log("success Hello", response);
          this.amiFlag = true;
        },(error)=>{
          console.log("fail Hello", error);
          this.amiFlag = false;
        }
      )
    }
  }
  getInstanceType(){
    this.templateService.getInstancesTypes().subscribe(
      (response:any)=>{
        console.log("success Hello", response.instanceType);
        this.instanceTypes = response.instanceType;
      },(error:any)=>{
        console.log("fail Hello", error);
      }
    )

  }

  submitBtn() {
    let txt = JSON.stringify(this.templateFormGroup.value);
    let templateModel = JSON.parse(txt);
    this.getAMI(templateModel.ami) // this method doesnot exist in api
    //if(this.amiFlag) {
      let model = new TemplateModel()
      model.amiId = templateModel.ami;
      model.subnetId = templateModel.subnet;
      model.securityGroups = templateModel.security;
      model.instanceType = templateModel.instance;
      alert("Template Details " + "Subnet: " + model.subnetId + "AMI: " + model.amiId + "Security Groups: "+ model.securityGroups + "Instance Type: " +model.instanceType);

    this.templateService.add(model).subscribe(
      (response:any)=>{
        console.log("success added");
        this.instanceTypes = response.instanceType;
      },(error:any)=>{
        console.log("fail to add", error);
      }
    )
    // }else{
    //   alert("enter a valid ami please  ");
    // }
  }

}

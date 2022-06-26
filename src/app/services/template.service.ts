import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {InstanceCreateModel} from "../models/instances/instance.create.model";
import {Observable} from "rxjs";
import {TemplateModel} from "../models/templates/template.model";
import {AmiModel} from "../models/templates/ami.model";
import {AssignTemplateModel} from "../models/templates/assign.template.model";

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  securityGroups:Array<string> = [];
  constructor(private api: ApiService) { }

  getSubnet() {
    return this.api.get("/api/subnet");
  }

  getSecurityGroups(vpcId:string){
    return this.api.get(`/api/securityGroups/${vpcId}`);
  }

  getInstancesTypes(){
    return this.api.get("/api/instanceTypes");
  }

  getAmi(amiModel:AmiModel){
    return this.api.post("/api/ami", amiModel);
  }

  create(templateModel: TemplateModel){
    return this.api.post("/api/templates", templateModel);
  }

  assignTemplateToInstructors(assignTemplate: AssignTemplateModel){
    return this.api.update("/api/templates",assignTemplate);
  }

  getAllSecurityGroups(): string[]{
    this.securityGroups.push("sg-02e6e76892b7e1581");
    this.securityGroups.push("sg-02e6e76892b7e1582"); // dummy
    this.securityGroups.push("sg-02e6e76892b7e1583"); //dummy
    this.securityGroups.push("sg-02e6e76892b7e1584"); //dummy
    this.securityGroups.push("sg-02e6e76892b7e1585"); //dummy
    return this.securityGroups;
  }

  getAllTemplates() {
    return this.api.get("/api/templates");
  }
}

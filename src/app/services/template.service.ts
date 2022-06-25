import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {InstanceCreateModel} from "../models/instances/instance.create.model";
import {Observable} from "rxjs";
import {TemplateModel} from "../models/templates/template.model";
import {AmiModel} from "../models/templates/ami.model";

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

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
    return this.api.post("/api/template", templateModel);
  }

  getAll() {
    return this.api.get("/api/template");
  }
}

import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {InstanceCreateModel} from "../models/instances/instance.create.model";
import {Observable} from "rxjs";
import {TemplateModel} from "../models/templates/template.model";

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  securityGroups:Array<string> = [];
  constructor(private api: ApiService) { }

  getSubnet() {
    return this.api.get("/api/template/subnet");
  }

  getInstancesTypes(){
    return this.api.get("/api/template/types");
  }

  add(templateModel: TemplateModel){
    return this.api.post("/api/template", templateModel);
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
    return this.api.get("/api/template");
  }
}

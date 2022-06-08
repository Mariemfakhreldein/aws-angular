import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {BranchModel} from "../models/branch/branch.model";

@Injectable({
  providedIn: 'root'
})
export class BranchService{

  branchManagers:Array<string> = [];
  branchPrograms:Array<string> = [];
  constructor(private api: ApiService) { }

  getTrainingManager() {
    //return this.api.get("/api/template/subnet");
  }

  getTrainingPrograms(){
    //return this.api.get("/api/template/types");
  }

  add(branchModel: BranchModel){
    //return this.api.post("/api/template", branchModel);
  }

  getAllTrainingManager(): string[]{
    this.branchManagers.push("branch Manager 1");
    this.branchManagers.push("branch Manager 2"); // dummy
    this.branchManagers.push("branch Manager 3"); //dummy
    this.branchManagers.push("branch Manager 4"); //dummy
    this.branchManagers.push("branch Manager 5"); //dummy
    return this.branchManagers;
  }

  getAllTrainingPrograms(): string[]{
    this.branchPrograms.push("Program 1");
    this.branchPrograms.push("Program 2"); // dummy
    this.branchPrograms.push("Program 3"); //dummy
    this.branchPrograms.push("Program 4"); //dummy
    this.branchPrograms.push("Program 5"); //dummy
    return this.branchPrograms;
  }

}

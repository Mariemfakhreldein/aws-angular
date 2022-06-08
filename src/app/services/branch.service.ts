import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {BranchModel} from "../models/branch/branch.model";

@Injectable({
  providedIn: 'root'
})
export class BranchService{

  branchManagers:Array<string> = [];
  branchPrograms:Array<string> = [];
  branches:Array<BranchModel> = [];
  branch1:BranchModel;

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

  getAll(){
    //return this.api.get("/api/template/types");
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

  getBranches():BranchModel[]{
    let branch1 = new BranchModel();
    branch1.name = "branch1";
    branch1.location = "Giza";

    let branch2 = new BranchModel();
    branch2.name = "branch2";
    branch2.location = "Giza";

    let branch3 = new BranchModel();
    branch3.name = "branch3";
    branch3.location = "Giza";

    let branch4 = new BranchModel();
    branch4.name = "branch4";
    branch4.location = "Giza";

    let branch5 = new BranchModel();
    branch5.name = "branch5";
    branch5.location = "Giza";

    this.branches.push(branch1);
    this.branches.push(branch2);
    this.branches.push(branch3);
    this.branches.push(branch4);
    this.branches.push(branch5);

    return  this.branches;
  }

  getBranchDetails():BranchModel {
    this.branch1 = new BranchModel();
    this.branch1.name = "branch1";
    this.branch1.location = "Giza";
    this.branch1.trainingManager = "training manager 1";
    this.branch1.trainingProgram.push("program 1");
    this.branch1.trainingProgram.push("program 2");
    this.branch1.trainingProgram.push("program 3");
    this.branch1.trainingProgram.push("program 4");
    this.branch1.trainingProgram.push("program 5");
    return this.branch1;
  }
}

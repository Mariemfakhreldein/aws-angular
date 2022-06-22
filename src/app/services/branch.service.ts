import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {BranchModel} from "../models/branch/branch.model";
import {BranchPostModel} from "../models/branch/branch.post.model";

@Injectable({
  providedIn: 'root'
})
export class BranchService{

  branchManagers:Array<string> = [];
  branchPrograms:Array<string> = [];
  branches:Array<BranchModel> = [];
  branch1:BranchModel;

  constructor(private api: ApiService) { }

  update(id: string, branchModel: BranchPostModel) {
    return this.api.update(`/api/branches/${id}`, branchModel);
  }

  getBranch(id: string){
    return this.api.get(`/api/branches/${id}`);
  }

  add(branchModel: BranchPostModel){
    return this.api.post("/api/branches", branchModel);
  }

  getAll(){
    return this.api.get("/api/branches");
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
    branch1.address = "Giza";

    let branch2 = new BranchModel();
    branch2.name = "branch2";
    branch2.address = "Giza";

    let branch3 = new BranchModel();
    branch3.name = "branch3";
    branch3.address = "Giza";

    let branch4 = new BranchModel();
    branch4.name = "branch4";
    branch4.address = "Giza";

    let branch5 = new BranchModel();
    branch5.name = "branch5";
    branch5.address = "Giza";

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
    this.branch1.address = "Giza";
    // this.branch1.trainingManager = "training manager 1";
    // this.branch1.trainingProgram.push("program 1");
    // this.branch1.trainingProgram.push("program 2");
    // this.branch1.trainingProgram.push("program 3");
    // this.branch1.trainingProgram.push("program 4");
    // this.branch1.trainingProgram.push("program 5");
    return this.branch1;
  }
}

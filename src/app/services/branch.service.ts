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

}

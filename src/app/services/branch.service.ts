import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {BranchModel} from "../models/branch/branch.model";
import {BranchPostModel} from "../models/branch/branch.post.model";

@Injectable({
  providedIn: 'root'
})
export class BranchService{

  constructor(private api: ApiService) { }

  update(id: string, branchModel: BranchPostModel) {
    return this.api.update(`/api/branches/${id}`, branchModel);
  }

  getById(id: string){
    return this.api.get(`/api/branches/${id}`);
  }

  create(branchModel: BranchPostModel){
    return this.api.post("/api/branches", branchModel);
  }

  getAll(){
    return this.api.get("/api/branches");
  }

}

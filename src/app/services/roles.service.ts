import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {IntakePostModel} from "../models/intake/intake.post.model";
import {RoleModel} from "../models/roles/role.model";
import {IntakePutModel} from "../models/intake/intake.put.model";

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private api: ApiService) { }

  getAll(){
    return this.api.get("/api/roles");
  }
  create(roleModel: RoleModel){
    return this.api.post("/api/roles", roleModel );
  }
  getById(roleId:any){
    return this.api.get(`api/roles/${roleId}`)
  }
  update(roleModel: RoleModel){
    return this.api.update(`/api/roles/${roleModel.id}`,roleModel);
  }
}

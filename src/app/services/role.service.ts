import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {InstanceCreateModel} from "../models/instances/instance.create.model";
import {Track} from "../models/instances/track.model";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private api: ApiService) { }


  getAllRoles(){
    return this.api.get("/api/roles");
  }

}

import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class PrivilegesService {

  constructor(private api: ApiService) { }

  getAllPrivileges(){
    return this.api.get("/api/privileges");
  }


}

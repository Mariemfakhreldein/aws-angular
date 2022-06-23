import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: ApiService) { }

  getAllStudents() {
    return this.api.get("/api/students");
  }

  getAllUsers() {
    return this.api.get("/api/students");
  }

  getAllUserType(){
    return this.api.get("/api/users");
  }
}

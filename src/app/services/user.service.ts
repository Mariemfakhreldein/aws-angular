import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {StudentModel} from "../models/users/student.model";

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

  addStudents(students: any){
    return this.api.post("/api/students",students);
  }
}

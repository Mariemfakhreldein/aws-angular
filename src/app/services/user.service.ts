import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: ApiService) { }

  getAllStudents() {
    return this.api.get("/api/users/students");
  }

  getAllInstructors() {
    return this.api.get("/api/staff/instructors");
  }

  getAllUsers() {
    return this.api.get("/api/users/students");
  }

}

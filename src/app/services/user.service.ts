import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {StudentModel} from "../models/users/student.model";
import {UserRolesModel} from "../models/users/user.roles.model";
import {UserTracksModel} from "../models/users/user.tracks.model";
import {PasswordModel} from "../models/password/password.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userRoles:UserRolesModel[];
  userTracks:UserTracksModel[];

  constructor(private api: ApiService) { }

  getAllStudents() {
    return this.api.get("/api/students");
  }

  getAllInstructors() {
    return this.api.get("/api/staff/instructors");
  }

  getAllUsers() {
    return this.api.get("/api/students");
  }

  getAllUserType(){
    return this.api.get("/api/users");
  }

  addStudents(students: any){
    return this.api.post("/api/students",students);
  }

  addStaff(staffList: any){
    return this.api.post("/api/staff",staffList);
  }

  getStudentRoles(): UserRolesModel[]{
    this.userRoles.push(new UserRolesModel(1, "hafsa1"));
    this.userRoles.push(new UserRolesModel(2, "hafsa2"));
    this.userRoles.push(new UserRolesModel(3, "hafsa3"));
    this.userRoles.push(new UserRolesModel(4, "hafsa4"));
    this.userRoles.push(new UserRolesModel(5, "hafsa5"));
    return this.userRoles;
  }

  getStudentTracks(): UserTracksModel[]{
    this.userTracks.push(new UserTracksModel(1, "hafsa1"));
    this.userTracks.push(new UserTracksModel(2, "hafsa2"));
    this.userTracks.push(new UserTracksModel(3, "hafsa3"));
    this.userTracks.push(new UserTracksModel(4, "hafsa4"));
    this.userTracks.push(new UserTracksModel(5, "hafsa5"));
    return this.userTracks;
  }

  getUserById(){
    return this.api.get(`/api/users/profile`);
  }

  getOldPassword(){

  }

  updatePassword(password:PasswordModel){
    return this.api.update(`/api/users`,password);
  }

  getStudentsByTrack(trackId) {
    return this.api.get(`/api/tracks/${trackId}/students`);
  }
}

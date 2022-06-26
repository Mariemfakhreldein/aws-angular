import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {StudentModel} from "../models/users/student.model";
import {UserRolesModel} from "../models/users/user.roles.model";
import {UserTracksModel} from "../models/users/user.tracks.model";
import {BranchPostModel} from "../models/branch/branch.post.model";
import {UpdateUserModel} from "../models/users/update.user.model";

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

  getAllUsers() {
    return this.api.get("/api/students");
  }

  getUser(id: string) {
    return this.api.get(`/api/users/${id}`);
  }

  getAllUserType(id: string){
    return this.api.get(`/api/users/${id}`);
  }

  addStudents(students: any){
    return this.api.post("/api/students",students);
  }

  update(id: string, model: UpdateUserModel) {
    return this.api.update(`/api/staff/${id}`, model);
  }


  // getStudentRoles(): UserRolesModel[]{
  //   this.userRoles.push(new UserRolesModel(1, "hafsa1"));
  //   this.userRoles.push(new UserRolesModel(2, "hafsa2"));
  //   this.userRoles.push(new UserRolesModel(3, "hafsa3"));
  //   this.userRoles.push(new UserRolesModel(4, "hafsa4"));
  //   this.userRoles.push(new UserRolesModel(5, "hafsa5"));
  //   return this.userRoles;
  // }

  // getStudentTracks(): UserTracksModel[]{
  //   this.userTracks.push(new UserTracksModel(1, "hafsa1"));
  //   this.userTracks.push(new UserTracksModel(2, "hafsa2"));
  //   this.userTracks.push(new UserTracksModel(3, "hafsa3"));
  //   this.userTracks.push(new UserTracksModel(4, "hafsa4"));
  //   this.userTracks.push(new UserTracksModel(5, "hafsa5"));
  //   return this.userTracks;
  // }
}

import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {InstanceCreateModel} from "../models/instances/instance.create.model";
import {Track} from "../models/instances/track.model";

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private api: ApiService) { }


  getAllTracks(){

    return this.api.get("/api/tracks");
  }

  getAllTrackById(trackId:any){

    return this.api.get(`/api/tracks/${trackId}`);
  }

  getAllBranches(){
    return this.api.get("/api/branches");
  }

  getIntakes() {
    return this.api.get("/api/intakes")
  }

  getTrainingProgramsByBranch(branchId: any) {
    return this.api.get(`/api/branches/${branchId}/trainingPrograms`)
  }

  getIntakeByTrainingProgram(trainingProgramId:any) {
    return this.api.get(`/api/trainingPrograms/${trainingProgramId}/intakes`)

  }

  getTrackByIntake(intakeId: any){
    return this.api.get(`/api/intakes/${intakeId}/tracks`)
  }

  createTrack(track: Track){
    return this.api.post("/api/tracks",track );
  }

  updateTrack(trackId: any,body:any){
    return this.api.update(`/api/tracks/${trackId}`,body);
  }

  deleteTrack(trackId: any){
    return this.api.post("/api/tracks/",trackId );
  }


}

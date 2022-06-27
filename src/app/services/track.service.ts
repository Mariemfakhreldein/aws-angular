import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {InstanceCreateModel} from "../models/instances/instance.create.model";
import {Track} from "../models/instances/track.model";

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private api: ApiService) { }


  getAll(){
    return this.api.get("/api/tracks");
  }

  getById(trackId:any){

    return this.api.get(`/api/tracks/${trackId}`);
  }


  getTrackByIntake(intakeId: any){
    return this.api.get(`/api/intakes/${intakeId}/tracks`)
  }

  create(track: Track){
    return this.api.post("/api/tracks",track );
  }

  update(trackId: any,body:any){
    return this.api.update(`/api/tracks/${trackId}`,body);
  }

  delete(trackId: any){
    return this.api.post("/api/tracks/",trackId );
  }


}

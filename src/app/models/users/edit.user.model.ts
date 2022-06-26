import {UserTrackModel} from "../tracks/user.tracks.model";

export class EditUserModel {

  id: number;
  username: string;
  email: string;
  role: string;
  tracks: UserTrackModel[];


  public equals(model:EditUserModel): boolean{

    if(this.username === model.username
      && this.email === model.email
      && this.role === model.role
      && this.isTracks(model.tracks)){
      return true;
    }else {
      return false;
    }
  }

  isTracks(b:UserTrackModel[]):boolean{

    for(let i=0; i<this.tracks.length; i++){
      let flag = false;
      for(let j=0; j<b.length; j++){
        if(this.tracks[i].trackName === b[j].trackName){
          flag = true;
        }
      }
      if(!flag){
        return false;
      }
    }

    return Array.isArray(Array(this.tracks)) &&
      Array.isArray(Array(b)) &&
      this.tracks.length === b.length
  }
  toString(){
    console.log(this.id + this.username);
  }
}

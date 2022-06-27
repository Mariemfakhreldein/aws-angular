import {TrackModel} from "../tracks/track.model";

export class UserModel {

  id: number;
  username: string;
  email: string;
  role: string;
  tracks: TrackModel[];



  toString() {
    console.log(this.username + this.email + this.role);
  }
}

import {TrackModel} from "../tracks/track.model";

export class UserModel {

  id: number;
  username: string;
  email: string;
  role: string;
  tracks: TrackModel[];

}

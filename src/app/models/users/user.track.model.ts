
export class UserTrackModel {

  id: number;
  trackName: string;

  constructor(id:number, track: string){
    this.id = id;
    this.trackName = track;
  }

  toString(){
    console.log(this.trackName + this.trackName);
  }
}

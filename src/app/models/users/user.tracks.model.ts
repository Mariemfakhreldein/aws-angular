
export class UserTracksModel {

  id: number;
  track: string;

  constructor(id:number, track: string){
    this.id = id;
    this.track = track;
  }

  toString(){
    console.log(this.track + this.track);
  }
}

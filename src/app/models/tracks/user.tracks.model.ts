
export class UserTrackModel {

  id: number;
  trackName: string;

  constructor(id: number, name: string){
        this.id = id;
        this.trackName = name;
      }

  toString(){
    console.log(this.id + this.trackName);
  }
}

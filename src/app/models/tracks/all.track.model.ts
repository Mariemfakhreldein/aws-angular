export class AllTrackModel{

  id:any;
  name:string;
  intakeId:number;

  constructor(id:number, track: string){
    this.id = id;
    this.name = track;
  }
}

export class Track{
  id:any;
  intakeId:number;
  name:string;

  public equals(model:Track):boolean{
    return (this.intakeId === model.intakeId && this.name === model.name);
  }

  // public empty():boolean{
  //   return (this.intakeId);
  // }
}

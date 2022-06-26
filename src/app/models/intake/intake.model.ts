export class IntakeModel{

  id:any;
  intakeName:string;
  intakeDescription:string;
  trainingProgram:any;

  public equals(model:IntakeModel):boolean{
    return (this.intakeName === model.intakeName && this.intakeDescription === model.intakeDescription && this.trainingProgram?.id === model.trainingProgram?.id);
  }

}

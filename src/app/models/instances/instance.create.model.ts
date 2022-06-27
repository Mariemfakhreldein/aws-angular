export class InstanceCreateModel{

  instanceName: string;
  keyPair: string;
  studentIds: number[];
  templateId: number;
  timeToLiveInMinutes:number;


  constructor(instanceName: string, keyPair: string, studentIds: number[], templateId: number, timeToLiveInMinutes:number){
    this.instanceName = instanceName;
    this.keyPair = keyPair;
    this.studentIds = studentIds;
    this.templateId = templateId;
    this.timeToLiveInMinutes = timeToLiveInMinutes;
  }

}

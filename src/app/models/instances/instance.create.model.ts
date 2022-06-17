export class InstanceCreateModel{

  instanceName: string;
  keyPair: string;
  studentIds: number[];
  templateId: number;

  constructor(instanceName: string, keyPair: string, studentIds: number[], templateId: number){
    this.instanceName = instanceName;
    this.keyPair = keyPair;
    this.studentIds = studentIds;
    this.templateId = templateId;
  }

}

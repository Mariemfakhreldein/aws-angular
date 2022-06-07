export class InstanceCreateModel{

  instanceName: string;
  keyPair: string;
  studentId: number;
  templateId: number;

  constructor(instanceName: string, keyPair: string, studentId: number, templateId: number){
    this.instanceName = instanceName;
    this.keyPair = keyPair;
    this.studentId = studentId;
    this.templateId = templateId;
  }

}

import {AmiModel} from "./ami.model";

export class TemplateModel{

  ami = new AmiModel();
  subnetId: string;
  instanceType: string;
  securityGroups: string[] = [];

}

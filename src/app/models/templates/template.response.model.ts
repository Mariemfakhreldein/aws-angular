import {AmiModel} from "./ami.model";

export class TemplateResponseModel{

  id: string;
  ami: AmiModel;
  subnetId: string;
  instanceType: string;
  securityGroups: Array<number> ;

}

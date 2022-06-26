import {AmiModel} from "./ami.model";

export class TemplateResponseModel{
  id: number;
  amiId: string;
  subnetId: string;
  instanceType: string;
  securityGroup: string[];

}

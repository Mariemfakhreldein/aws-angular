import {AmiModel} from "./ami.model";

export class TemplateModel{
  amiId :string;
  subnetId: string;
  instanceType: string;
  securityGroups: Array<number> ;

}

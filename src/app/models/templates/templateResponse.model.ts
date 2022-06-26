import {AmiModel} from "./ami.model";
import {SecurityGroupsModel} from "./securityGroups.model";

export class TemplateResponseModel{
  id: number;
  amiId: string;
  subnetId: string;
  instanceType: string;
  securityGroup: SecurityGroupsModel[];

}

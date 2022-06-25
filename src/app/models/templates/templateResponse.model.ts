import {AmiModel} from "./ami.model";
import {SecurityGroupsModel} from "./securityGroups.model";

export class TemplateResponseModel{
  id :number;
  subnetId: string;
  instanceType: string;
  securityGroup: SecurityGroupsModel[];

}

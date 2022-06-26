import {AmiModel} from "./ami.model";
import {SecurityGroupsModel} from "./securityGroups.model";

export class TemplateResponseModel{

  id: string;
  ami: AmiModel;
  subnetId: string;
  instanceType: string;
  securityGroups: SecurityGroupsModel[];



}

import {InstanceUserModel} from "./instanceUser.model";

export class InstanceModel {

  id:number;
  name:string;
  amiId:string;
  instanceId:string;
  state:string;
  keyMaterial:string;
  keyPair:any;
  timeToLiveInMinutes:any;
  publicIp:string;
  publicDnsName:string;
  instanceType:string;
  subnetId:string;
  vpcId:string;
  creationDateTime:any;
  instanceUser:InstanceUserModel;
  lastStartedDateTime:any;
  // decryptedPassword:string;
  // username:string;

  // platform:string;
  // creator:string; /////////////////////////edit
  // instanceUsers:[]; //////////////////////edit
  // securityGroups:[];///////////////////////edit

}

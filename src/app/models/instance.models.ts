export class Instance {


  id:number;
  name:string;
  amiId:string;
  instanceId:string;
  state:string;
  keyMaterial:string;
  publicIp:string;
  publicDnsName:string;
  instanceType:string;
  subnetId:string;
  vpcId:string;
  decryptedPassword:string;
  username:string;
  creationDateTime:string;
  keyPair:string; //////////////////////////edit
  creator:string; /////////////////////////edit
  instanceUsers:[]; //////////////////////edit
  securityGroups:[];///////////////////////edit




}

import { UserModel } from '../users/user.model';
import { InstanceModel } from './instance.models';
export class InstanceLogsModel{

  id:number;
  instance:InstanceModel;
  action:string;
  dateTime:string;
  actionMaker:UserModel;

}

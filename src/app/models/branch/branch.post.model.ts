import {BranchModel} from "./branch.model";

export class BranchPostModel{

  address:string;
  name:string;
  branchStatus:boolean;

  public equals(model:BranchModel): boolean{
    if(this.name === model.name && this.address === model.address && this.branchStatus === model.branchStatus){
      return true;
    }else {
      return false;
    }
  }

}

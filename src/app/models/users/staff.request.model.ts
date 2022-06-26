import {StaffModel} from "./staff.model";

export class StaffRequestModel {
  staffRequests: StaffModel[];

  constructor (staffRequests: StaffModel[]){
    this.staffRequests = staffRequests;
  }
}

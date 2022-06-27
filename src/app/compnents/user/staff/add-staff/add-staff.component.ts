import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BranchService} from "../../../../services/branch.service";
import {IntakeService} from "../../../../services/intake.service";
import {TrackService} from "../../../../services/track.service";
import {NgxCsvParser, NgxCSVParserError} from "ngx-csv-parser";
import {UserService} from "../../../../services/user.service";
import {Patterns} from "../../../../patterns/patterns";
import {UserModel} from "../../../../models/users/user.model";
import {StaffModel} from "../../../../models/users/staff.model";
import {StaffRequestModel} from "../../../../models/users/staff.request.model";

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {


  staffList: StaffModel[] = [];
  staffFromFile: StaffModel[] = [];

  page = 1;

  csvRecords: any;
  header: boolean = false;
  isParsedWell = true;
  errorMessage = "";

  successMessage = "Staff added successfully";
  failedMessage = "";

  isSuccess = false;
  isLoading = true;


  addStaff = new FormGroup({});
  constructor(private formBuilder: FormBuilder,
              private branchService: BranchService,
              private intakeService: IntakeService,
              private trackService: TrackService,
              private ngxCsvParser: NgxCsvParser,
              private userService: UserService) { }

  ngOnInit(): void {
    this.reactiveStaffForm();

  }

  reactiveStaffForm() :void
  {
    this.addStaff = this.formBuilder.group({
      userName: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['',[Validators.required, Validators.pattern(Patterns.Email)]],
    });
  }

  @ViewChild('usernameInput') usernameInput;
  @ViewChild('emailInput') emailInput;

  add() {
    let staff = new StaffModel();
    staff.username = this.addStaff.value.userName;
    staff.email = this.addStaff.value.email;

    this.usernameInput.nativeElement.value='';
    this.emailInput.nativeElement.value='';
    this.staffList.push(staff);
    this.addStaff.reset();
  }

  submit(){
    this.userService.addStaff(new StaffRequestModel(this.staffList)).subscribe({
      next: (response: any) => {},
      error: (e) => {
        if(e.status == 201){
          this.changeSuccessAndLoading(false, true);
        }else if(e.status == 406){
          this.failedMessage = "Duplicate email";
          this.changeSuccessAndLoading(false, false);
        }else{
          this.failedMessage = "Something goes wrong email";
          this.changeSuccessAndLoading(false, false);
        }
        this.emptyFields();
      },
    });
  }


  delete(index: number) {
    this.staffList.splice(index,1);
  }

  @ViewChild('fileImportInput') fileImportInput: any;
  searchValue: any;

  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe({
        next: (result: Array<UserModel>): void => {
          try {
            for (let i = 0; i < result.length; i++) {
              let staff = new StaffModel();
              staff.username = result[i][0];
              staff.email = result[i][1];

              if (staff.username == undefined || staff.email == undefined) {
                throw new NgxCsvParser();
              }
              this.staffFromFile.push(staff);
            }
            this.errorMessage = "";
            this.csvRecords = result;
            this.staffFromFile.forEach(s => this.staffList.push(s));
            this.staffFromFile = [];
          }
          catch (error : any){
            this.staffFromFile = [];
            this.errorMessage = "File isn't well formatted";
            this.fileImportInput.nativeElement.value='';
          }
          this.isLoading=false;
          },

        error: (error: NgxCSVParserError): void => {
          this.errorMessage = "File isn't well formatted";
          this.staffFromFile = [];
          this.isLoading=false;
        }
      }
    );
  }

  emptyFields(){
    this.fileImportInput.nativeElement.value='';
    this.staffList = [];
    this.staffFromFile = [];
  }

  changeSuccessAndLoading(loading: boolean, success:boolean){
    this.isLoading = loading;
    this.isSuccess = success;
  }

}


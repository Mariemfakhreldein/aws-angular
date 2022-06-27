import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Patterns} from "../../../../patterns/patterns";
import {BranchModel} from "../../../../models/branch/branch.model";
import {TrainingProgram} from "../../../../models/instances/training.program.model";
import {Intake} from "../../../../models/instances/intake.model";
import {Track} from "../../../../models/instances/track.model";
import {BranchService} from "../../../../services/branch.service";
import {IntakeService} from "../../../../services/intake.service";
import {TrackService} from "../../../../services/track.service";
import {UserModel} from "../../../../models/users/user.model";
import {NgxCsvParser, NgxCSVParserError} from "ngx-csv-parser";
import {UserService} from "../../../../services/user.service";
import {StudentModel} from "../../../../models/users/student.model";
import {StudentRequestModel} from "../../../../models/users/student.request.model";
import {TrainingProgramService} from "../../../../services/training-program.service";


@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit {

  branches: BranchModel[] = [];
  trainingPrograms: TrainingProgram[] = [];
  intakes: Intake[] = [];
  tracks: Track[] = [];

  students: StudentModel[] = [];
  studentsFromFile: StudentModel[] = [];

  trackId: number;
  page = 1;

  csvRecords: any;
  header: boolean = false;
  isParsedWell = true;
  errorMessage = "";
  successMessage = "Students added successfully";
  failedMessage = "";

  isSuccess = false;
  isLoading = true;

  addStudents = new FormGroup({});
  constructor(private formBuilder: FormBuilder,
              private branchService: BranchService,
              private intakeService: IntakeService,
              private trackService: TrackService,
              private ngxCsvParser: NgxCsvParser,
              private userService: UserService,
              private trainingProgramService:TrainingProgramService) { }

  ngOnInit(): void {
    this.reactiveStaffForm();
    this.getAllBranches();
  }

  reactiveStaffForm() :void
  {
    this.addStudents = this.formBuilder.group({
      branches:["",[Validators.required]],
      trainingPrograms:["",[Validators.required]],
      intakes:["",[Validators.required]],
      tracks:["",[Validators.required]],
      userName: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['',[Validators.required, Validators.pattern(Patterns.Email)]],
    });
    this.addStudents.get('branches').valueChanges.subscribe((value)=>{
      this.addStudents.get('trainingPrograms').setValue(null);

    });
    this.addStudents.get('trainingPrograms').valueChanges.subscribe((value)=>{
      this.addStudents.get('intakes').setValue(null);

    });
    this.addStudents.get('intakes').valueChanges.subscribe((value)=>{
      this.addStudents.get('tracks').setValue(null);

    });
  }


  private getAllBranches() {
    this.branchService.getAll().subscribe(
      {
        next: (data: any) => {
          this.branches = data.branchResponsesList;
        },
        error: (e) => {},
      });
  }

  onChangeBranch(branchId: number) {
    this.getTrainingProgramsByBranch(branchId);
  }

  getTrainingProgramsByBranch(branchId: number){
    this.trainingPrograms=[];
    this.trainingProgramService.getTrainingProgramsByBranch(branchId).subscribe(
      {
        next: (data: any) => {
          this.trainingPrograms = data.trainingPrograms;
        },
        error: (e) => {},
      });
  }

  onChangeTrainingProgram(trainingProgramId: number) {
   this.getIntakesByTrainingProgram(trainingProgramId);
  }

  getIntakesByTrainingProgram(trainingProgramId: number){
    this.intakes=[];
    if(trainingProgramId !=null){

      this.intakeService.getIntakeByTrainingProgram(trainingProgramId).subscribe({
        next: (data: any) => {
          this.intakes = data.intakeResponsesList;
        },
        error: (e) => {},
      });

    }
  }

  onChangeIntake(intakeId: number) {
    this.getTracksByIntake(intakeId);
  }

  getTracksByIntake(intakeId: number){
    this.tracks=[];
    if(intakeId !=null){
      this.trackService.getTrackByIntake(intakeId).subscribe({
        next: (data: any) => {
          this.tracks = data.trackResponsesList;
        },
        error: (e) => {},
      });
    }
  }

  onChangeTrack(trackId: number) {
    this.trackId = trackId;
  }

  @ViewChild('usernameInput') usernameInput;
  @ViewChild('emailInput') emailInput;

  add() {
    let student = new StudentModel();
    student.username = this.addStudents.value.userName;
    student.email = this.addStudents.value.email;
    student.trackId = this.trackId;
    this.usernameInput.nativeElement.value='';
    this.emailInput.nativeElement.value='';
    this.students.push(student);
    this.addStudents.reset();
  }

  submit(){
    this.userService.addStudents(new StudentRequestModel(this.students)).subscribe({
      next: (response: any) => {},
      error: (e) => {
        if(e.status == 201){
          this.changeSuccessAndLoading(false, true);
        }else if(e.status == 406){
          this.failedMessage = "Duplicate email";
          this.changeSuccessAndLoading(false, false);
        }else{
          this.failedMessage = "Something goes wrong";
          this.changeSuccessAndLoading(false, false);
        }
        this.emptyFields();
      },
    });
  }

  delete(index: number) {
    this.students.splice(index,1);
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
            let student = new StudentModel();
            student.username = result[i][0];
            student.email = result[i][1];
            student.trackId = this.trackId;
            if (student.username == undefined || student.email == undefined) {
              throw new NgxCsvParser();
            }
            this.studentsFromFile.push(student);
          }
          this.errorMessage = "";
          this.csvRecords = result;
          this.studentsFromFile.forEach(s => this.students.push(s));
          this.studentsFromFile = [];
        }
        catch (error : any){
          this.studentsFromFile = [];
          this.errorMessage = "File isn't well formatted";
          this.fileImportInput.nativeElement.value='';
        }},

      error: (error: NgxCSVParserError): void => {
        this.errorMessage = "File isn't well formatted";
        this.studentsFromFile = [];
      }
    }
    );
  }

  emptyFields(){
    this.fileImportInput.nativeElement.value='';
    this.students = [];
    this.addStudents.reset();
  }

  changeSuccessAndLoading(loading: boolean, success:boolean){
    this.isLoading = loading;
    this.isSuccess = success;
  }

  canUploadFile(): boolean{
    if(this.addStudents.get("branches").status =='VALID' &&
      this.addStudents.get("trainingPrograms").status =='VALID' &&
      this.addStudents.get("intakes").status =='VALID' &&
      this.addStudents.get("tracks").status =='VALID' ){
      return true;
    }
    return false;
  }
}

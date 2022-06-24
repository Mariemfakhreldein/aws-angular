import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Patterns} from "../../../../patterns/patterns";
import {BranchModel} from "../../../../models/branch/branch.model";
import {TrainingProgram} from "../../../../models/instances/training.program.model";
import {Intake} from "../../../../models/instances/intake.model";
import {Track} from "../../../../models/instances/track.model";
import {BranchService} from "../../../../services/branch.service";
import {IntakeService} from "../../../../services/intake.service";
import {TrackService} from "../../../../services/track.service";
import {UserModel} from "../../../../models/users/user.model";
import {TokenService} from "../../../../services/token.service";
import {AuthService} from "../../../../services/auth.service";

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

  students: UserModel[] = [];
  lines = []; //for headings
  linesR = []; // for rows
  trackId: number;
  page = 1;

  addStudents = new FormGroup({});
  constructor(private formBuilder: FormBuilder,
              private branchService: BranchService,
              private intakeService: IntakeService,
              private trackService: TrackService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.reactiveStaffForm();
    this.authService.getPrivileges().forEach(p=>console.log(p));
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
    this.tracks = [];
    this.getTrainingProgramsByBranch(branchId);
  }

  getTrainingProgramsByBranch(branchId: number){
    this.trackService.getTrainingProgramsByBranch(branchId).subscribe(
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
    this.intakeService.getIntakeByTrainingProgram(trainingProgramId).subscribe({
      next: (data: any) => {
        this.intakes = data.intakeResponsesList;
      },
      error: (e) => {},
    });
  }

  onChangeIntake(intakeId: number) {
    this.getTracksByIntake(intakeId);
  }

  getTracksByIntake(intakeId: number){
    this.trackService.getTrackByIntake(intakeId).subscribe({
      next: (data: any) => {
        this.tracks = data.trackResponsesList;
      },
      error: (e) => {},
    });
  }

  onChangeTrack(trackId: number) {
    this.trackId = trackId;
  }

  submit(){
  }


  delete(studentId: number) {
    this.students.splice(studentId);
  }

  changeListener(files: FileList){
    console.log(files);
    // if(files && files.target.files.length > 0) {
    //   let file : File = files.item(0);
    //   console.log(file.name);
    //   console.log(file.size);
    //   console.log(file.type);
    //
    //   //File reader method
    //   let reader: FileReader = new FileReader();
    //   reader.readAsText(file);
    //   reader.onload = (e) => {
    //     let csv: any = reader.result;
    //     let allTextLines = [];
    //     allTextLines = csv.split(/\r|\n|\r/);
    //
    //     let fileLength = allTextLines.length;
    //     let rows = [];
    //     for(let i = 1; i < fileLength; i++){
    //       console.log(allTextLines[i].split(','));
    //       rows.push(allTextLines[i].split(','));
    //     }
    //   //   for (let j = 0; j < arrl; j++) {
    //   //
    //   //     tarrR.push(rows[j]);
    //   //
    //   //   }
    //   //   //Push rows to array variable
    //   //   this.linesR.push(tarrR);
    //   // }
    //   }
    // }
  }
}

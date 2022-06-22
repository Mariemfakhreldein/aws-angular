import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BranchModel} from "../../../models/branch/branch.model";
import {Track} from "../../../models/instances/track.model";
import {Intake} from "../../../models/instances/intake.model";
import {UserService} from "../../../services/user.service";
import {TemplateService} from "../../../services/template.service";
import {InstanceService} from "../../../services/instance.service";
import {TrainingProgram} from "../../../models/instances/training.program.model";
import {TrackService} from "../../../services/track.service";

@Component({
  selector: 'app-manage-tracks',
  templateUrl: './manage-tracks.component.html',
  styleUrls: ['./manage-tracks.component.css']
})
export class ManageTracksComponent implements OnInit {

  myGroup: FormGroup = new FormGroup({});
  branches:BranchModel[]=[];
  trainingPrograms:TrainingProgram[]=[];
  intakes:Intake[]=[];
  track:Track=new Track();
  trackName: any;
  // private isSuccess: boolean;
  // private isLoading: boolean;
  isSuccess=false;
  isLoading=true;
  currentItem='track';
  action='created';

  constructor(private formBuilder: FormBuilder,
              private templateService: TemplateService,
              private trackService: TrackService) { }

  ngOnInit(): void {
    this.myGroup=this.formBuilder.group({
      branches:["",[Validators.required]],
      trainingPrograms:["",[Validators.required]],
      intakes:["",[Validators.required]],
      trackName:["",[Validators.required]],
    });
    this.getAllBranches();

  }

  private getAllBranches() {
    this.trackService.getAllBranches().subscribe(
      {
        next: (data: any) => {

          data.branchResponsesList.forEach(e => {

              console.log( "eeee" + e);

              this.branches.push(e);
            }
          )
        },
        error: (e) => {},
        // complete: () => console.info('complete')
      });

  }



  onChangeBranch(branchId:any) {

    console.log("on change" + branchId);


    this.trackService.getTrainingProgramsByBranch(branchId).subscribe(
      {
        next: (data: any) => {

          data.trainingPrograms.forEach(e => {

              console.log( "trainingPrograms" + e);

              this.trainingPrograms.push(e);
            }
          )
        },
        error: (e) => {},
        // complete: () => console.info('complete')
      });



  }

  onChangeTrainingProgram(trainingProgramId: any) {

    this.trackService.getIntakeByTrainingProgram(trainingProgramId).subscribe({
        next: (data: any) => {

          data.intakeResponsesList.forEach(e => {

              console.log( "trainingPrograms" + e);

              this.intakes.push(e);
            }
          )
        },
      error: (e) => {},
      // complete: () => console.info('complete')
    });

  }

  onChangeIntake(intakeId: any) {

    console.log("intakeId::::"+intakeId);

    this.track.intakeId=intakeId;

    console.log("this.track.intakeId::::"+this.track.intakeId);

  }



  submit() {

       // this.isSuccess=true;
       //
       // console.log("citemm"+this.currentItem);
    this.track.name=this.trackName;
    console.log("trackName:"+this.track.intakeId);
    console.log("trackName:"+this.track.name);
    this.trackService.createTrack(this.track).subscribe({
      next: (data:any) =>{

        this.isLoading=false;
        this.isSuccess=true;

      },
      error: (e) => { this.isLoading=false;this.isSuccess=false},
      // complete: () => console.info('complete')
    });
  }

  getIsSuccess(): boolean{
    return this.isSuccess;
  }


}

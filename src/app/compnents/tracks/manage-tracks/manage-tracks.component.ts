import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BranchModel} from "../../../models/branch/branch.model";
import {Track} from "../../../models/instances/track.model";
import {Intake} from "../../../models/instances/intake.model";
import {UserService} from "../../../services/user.service";
import {TemplateService} from "../../../services/template.service";
import {InstanceService} from "../../../services/instance.service";
import {TrainingProgram} from "../../../models/instances/training.program.model";

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
  //{branchname,trainingprogram,intakename,trackname}
  trackInfo:String[]=[];
  trackName: any;



  constructor(private formBuilder: FormBuilder,
              private templateService: TemplateService,
              private instanceService: InstanceService) { }

  ngOnInit(): void {
    this.myGroup=this.formBuilder.group({
      branches:["",[Validators.required]],
      trainingPrograms:["",[Validators.required]],
      tracks:["",[Validators.required]],
      trackName:["",[Validators.required]],
    });
    this.getAllBranches();
    this.getAllIntakes();
  }

  private getAllBranches() {
    this.instanceService.getAllBranches().subscribe(
      {
        next: (data: any) => {

          data.branchResponsesList.forEach(e => {

              console.log( "eeee" + e);

              this.branches.push(e);
            }
          )
        }


      }

    );
  }

  private getAllIntakes() {
    this.instanceService.getIntakes().subscribe({
        next: (data: any) => {

          data.intakeResponsesList.forEach(e => {

              console.log("eeee" + e);

              this.intakes.push(e);
            }
          )
        }
      }
    );
  }

  onChangeBranch(branchId:any) {

    console.log("on change" + branchId);
    this.trackInfo[0]=this.branches[branchId].name;

    this.instanceService.getTrainingProgramsByBranch(branchId).subscribe(
      {
        next: (data: any) => {

          data.trainingPrograms.forEach(e => {

              console.log( "trainingPrograms" + e);

              this.trainingPrograms.push(e);
            }
          )
        }

      }
    )

  }

  onChangeTrainingProgram(trainingProgramId: any) {
    this.trackInfo[1]=this.trainingPrograms[trainingProgramId].name;
  }

  onChangeIntake(intakeId: any) {
    console.log("++++"  + intakeId)

    this.trackInfo[2]=this.intakes[intakeId].intakeName;


  }



  submit() {

    this.trackInfo[3]=this.trackName;
    console.log("trackName:"+this.trackName);
    console.log("trackName:"+this.trackInfo);
  }


}

import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BranchModel} from "../../models/branch/branch.model";
import {TrainingProgram} from "../../models/instances/training.program.model";
import {IntakeService} from "../../services/intake.service";
import {BranchPostModel} from "../../models/branch/branch.post.model";
import {IntakeModel} from "../../models/intake/intake.model";
import {IntakePostModel} from "../../models/intake/intake.post.model";


@Component({
  selector: 'app-manage-intakes',
  templateUrl: './manage-intakes.component.html',
  styleUrls: ['./manage-intakes.component.css']
})
export class ManageIntakesComponent implements OnInit {

  myGroup: FormGroup = new FormGroup({});
  branches:BranchModel[]=[];
  trainingPrograms:TrainingProgram[]=[];
  intake:IntakeModel=new IntakeModel();
  intakeName: any;
  intakeAddress: any;
  intakePost=new IntakePostModel();
  trainingProgramName:any;

  isLoading:boolean=true;
  @Output() isSuccess=false;
  currentItem: string="Intake";

  allIntakes:IntakeModel[]=[];


  constructor(private formBuilder: FormBuilder,
              private intakeService: IntakeService,

              ) { }

  ngOnInit(): void {
    this.myGroup=this.formBuilder.group({
      branches:["",[Validators.required]],
      trainingPrograms:["",[Validators.required]],
      intakeName:["",[Validators.required]],
      intakeAddress:["",[Validators.required]]
    });
    this.getAllBranches();
    this.getAllIntakes();
  }

  private getAllBranches() {
    this.intakeService.getAllBranches().subscribe(
      {
        next: (data: any) => {

          data.branchResponsesList.forEach(e => {

              console.log( "eeee" + e);

              this.allIntakes.push(e);
            }
          )
        }


      }

    );

  }

  getAllIntakes(){
    this.intakeService.getAllIntakes().subscribe(
      {
        next: (data: any) => {


          data.intakeResponsesList.forEach(e => {
              this.allIntakes.push(e);
            }
          )
        }


      }

    );
  }



  onChangeBranch(branchId:any) {
    this.intakeService.getTrainingProgramsByBranch(branchId).subscribe(
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

    this.intakePost.trainingProgramId=trainingProgramId;
  }


  submitBtn() {



    this.intakePost.intakeName = this.intakeName;
    this.intakePost.intakeDescription = this.intakeAddress;


    this.CreateIntake(this.intakePost);


  }

  CreateIntake(model:IntakePostModel){
console.log(model.intakeName);
console.log(model.intakeDescription);
console.log(model.trainingProgramId);

    this.intakeService.createIntake(model).subscribe(
      (response:any)=>{
        this.isLoading=false;
        this.isSuccess=true;
        console.log(response);
      },(error:any)=>{
        this.isLoading=false;
        this.isSuccess=false;
        console.log("fail Hello", error);
      }
    )
  }

  getTrainingProgramById(trainingProgrammId:any){
    return this.intakeService.getTrainingProgrammById(trainingProgrammId).subscribe(
      (response:any)=>{

      },(error:any)=>{

      }
    )
  }

  delete(currentIndex: any) {

  }
}

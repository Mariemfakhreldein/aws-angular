import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BranchModel} from "../../../models/branch/branch.model";
import {TrainingProgram} from "../../../models/instances/training.program.model";
import {IntakePostModel} from "../../../models/intake/intake.post.model";
import {IntakeService} from "../../../services/intake.service";
import {ActivatedRoute} from "@angular/router";
import {IntakeModel} from "../../../models/intake/intake.model";
import {IntakePutModel} from "../../../models/intake/intake.put.model";

@Component({
  selector: 'app-edit-intake',
  templateUrl: './edit-intake.component.html',
  styleUrls: ['./edit-intake.component.css']
})
export class EditIntakeComponent implements OnInit {

  isLoading: boolean = true;
  @Output() isSuccess = false;
  currentItem: string = "Intake";


  intake=new IntakeModel();


  myGroup: FormGroup = new FormGroup({});
  branches: BranchModel[] = [];
  trainingPrograms: TrainingProgram[] = [];
  intakePut = new IntakePutModel();

  intakeName: any;
  intakeDescription: any;
  id:any;





  constructor(private formBuilder: FormBuilder,
              private intakeService: IntakeService,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap
      .subscribe(
        parms=>{
          this.id=parms.get('id');
          this.getIntakeDetails(this.id);
        }
      );

    this.intakeName=this.intake.intakeName;
    this.intakeDescription=this.intake.intakeDescription;
    this.trainingPrograms=this.intake.trainingProgram;

    this.myGroup = this.formBuilder.group({
      trainingPrograms: [this.intake.trainingProgram],
      intakeName: [this.intake.intakeName, [Validators.required]],
      intakeDescription: [this.intake.intakeDescription, [Validators.required]]
    });
  }


  submitBtn() {

      this.intakePut.id = this.id;
      this.intakePut.intakeName = this.intakeName;
      this.intakePut.intakeDescription = this.intakeDescription;
      this.intakePut.trainingProgramId = 1;
      this.updateIntake(this.intakePut);
    }


  updateIntake(model: IntakePutModel) {
    this.intakeService.update(model).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.isSuccess = true;
      }, (error: any) => {
        this.isLoading = false;
        this.isSuccess = false;
      }
    )
  }

  private getIntakeDetails(id: string) {
    this.intakeService.getById(id).subscribe({
      next: (data: any) => {
        this.intake=data;
        console.log(data);
        console.log("222222"+this.intake);
      }
    })
  }
}

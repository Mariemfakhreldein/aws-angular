import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BranchModel} from "../../../models/branch/branch.model";
import {TrainingProgram} from "../../../models/instances/training.program.model";
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


  intake=new IntakeModel();

  myGroup: FormGroup = new FormGroup({});
  branches: BranchModel[] = [];
  trainingPrograms: TrainingProgram[] = [];
  intakePut = new IntakePutModel();

  intakeName: any;
  intakeDescription: any;
  id:any;

  successMessage = 'intake is updated successfully';
  failMessage = 'Something goes wrong'

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
  }


  submitBtn() {
      this.intakePut.id = this.id;
      this.intakePut.intakeName = this.intakeName;
      this.intakePut.intakeDescription = this.intakeDescription;
      this.updateIntake(this.intakePut);
    }


  updateIntake(model: IntakePutModel) {
    this.intakeService.update(model).subscribe(
      (response: any) => {
        this.changeSuccessAndLoading(false, true);
      }, (error: any) => {
        this.changeSuccessAndLoading(false, false);
      }
    )
  }

  private getIntakeDetails(id: string) {
    this.intakeService.getById(id).subscribe({
      next: (data: any) => {
        this.intake.id=data.id;
        this.intake.intakeName = data.intakeName;
        this.intake.intakeDescription = data.intakeDescription;
        this.intake.trainingProgram = data.trainingProgram;
        this.intakeName = this.intake.intakeName;
        this.intakeDescription = this.intake.intakeDescription
        this.myGroup = this.formBuilder.group({
          trainingPrograms: [this.intake.trainingProgram],
          intakeName: [this.intake.intakeName, [Validators.required]],
          intakeDescription: [this.intake.intakeDescription, [Validators.required]]
        });
      }
    })
  }

  changeSuccessAndLoading(loading: boolean, success:boolean){
    this.isLoading = loading;
    this.isSuccess = success;
  }

}

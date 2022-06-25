import { Component, OnInit } from '@angular/core';
import {IntakeModel} from "../../../models/intake/intake.model";
import {IntakeService} from "../../../services/intake.service";

@Component({
  selector: 'app-show-all-intakes',
  templateUrl: './show-all-intakes.component.html',
  styleUrls: ['./show-all-intakes.component.css']
})
export class ShowAllIntakesComponent implements OnInit {

  allIntakes:IntakeModel[]=[];
  page=1;
  searchValue: any;
  constructor(private intakeService: IntakeService,) { }

  ngOnInit(): void {

    this.getAllIntakes();
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


  edit(currentIndex: number) {

  }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BranchModel} from "../../../models/branch/branch.model";
import {BranchService} from "../../../services/branch.service";

@Component({
  selector: 'app-detail-branch',
  templateUrl: './detail-branch.component.html',
  styleUrls: ['./detail-branch.component.css']
})
export class DetailBranchComponent implements OnInit {

  id:string;
  branch:BranchModel;
  constructor(private _activatedRoute: ActivatedRoute,
              private branchService:BranchService) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap
      .subscribe(
        parms => {
          this.id = parms.get('id');
          alert(this.id)
          this.getBranchDetails(this.id)


        }
      );

    //this.branch = this.branchService.getBranchDetails();


  }
  getBranchDetails(id:string){
    alert("here" + this.id)
    this.branchService.getBranch(id).subscribe(
      (response:any)=>{
        console.log(response);
        this.branch = response;
        console.log(response);
      },(error:any)=>{
        console.log("fail Hello", error);
      }
    )

  }

}

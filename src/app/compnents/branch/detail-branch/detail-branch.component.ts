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
  branch:any;
  constructor(private _activatedRoute: ActivatedRoute,
              private branchService:BranchService) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap
      .subscribe(
        parms => {
          this.id = parms.get('id');
        }
      );

    this.branch = this.branchService.getBranchDetails();


  }


}

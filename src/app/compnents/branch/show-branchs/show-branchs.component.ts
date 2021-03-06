import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BranchService} from "../../../services/branch.service";
import {BranchModel} from "../../../models/branch/branch.model";

@Component({
  selector: 'app-show-branchs',
  templateUrl: './show-branchs.component.html',
  styleUrls: ['./show-branchs.component.css']
})
export class ShowBranchsComponent implements OnInit {

  branches:BranchModel[];
  page:number=1;

  constructor(private route:Router,
              private branchService:BranchService) { }

  ngOnInit(): void {
    this.getBranches();
  }

  searchValue: any;

  getBranches(){
    this.branchService.getAll().subscribe(
      (response:any)=>{
        this.branches = response.branchResponsesList;
      },(error:any)=>{
      }
    )
  }
}

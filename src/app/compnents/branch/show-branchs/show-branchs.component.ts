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

  constructor(private route:Router,
              private branchService:BranchService) { }

  ngOnInit(): void {
    //this.branches = this.branchService.getBranches();
    this.getBranches();
  }

  createBranch(){
    this.route.navigateByUrl("/branch/create");
  }

  getBranches(){
    this.branchService.getAll().subscribe(
      (response:any)=>{
        console.log(response);
        this.branches = response.branchResponsesList;
        console.log(response.branchResponsesList);
      },(error:any)=>{
        console.log("fail Hello", error);
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-createnewstuff',
  templateUrl: './createnewstaff.component.html',
  styleUrls: ['./createnewstaff.component.css']
})
export class CreatenewstaffComponent implements OnInit {

  createStaff=new FormGroup({});
  constructor(private _formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.reactiveStaffForm();
  }

  reactiveStaffForm() :void
  {
    this.createStaff=this._formBuilder.group({
      username : new FormControl("",[Validators.required]),
      email : new FormControl("",[Validators.required,Validators.email]),
      password : new FormControl("iti_$taff" , [Validators.required]),
      trackName : new FormControl("",[Validators.required]),
      role : new FormControl("",[Validators.required])
    });
  }

}

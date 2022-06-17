import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-createnewstudent',
  templateUrl: './createnewstudent.component.html',
  styleUrls: ['./createnewstudent.component.css']
})
export class CreatenewstudentComponent implements OnInit {

  createStudent= new FormGroup({});
  constructor(public _formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.reactiveStaffForm();
  }
  reactiveStaffForm() :void
  {
    this.createStudent=this._formBuilder.group({
      username : new FormControl("",[Validators.required]),
      email : new FormControl("",[Validators.required,Validators.email]),
      password : new FormControl("iti_$taff" , [Validators.required]),
      trackName : new FormControl("",[Validators.required]),
      role : new FormControl("",[Validators.required])
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {Instance} from "../../../models/instance.models";

@Component({
  selector: 'app-create-instance',
  templateUrl: './create-instance.component.html',
  styleUrls: ['./create-instance.component.css']
})
export class CreateInstanceComponent implements OnInit {

  createInstance:Instance;

  constructor() { }

  ngOnInit(): void {
  }

  submitBtn():void
  {
    console.log(this.createInstance);
  }

}

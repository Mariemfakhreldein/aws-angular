import { Component, OnInit } from '@angular/core';
import {Instance} from "../../../models/instance.models";

@Component({
  selector: 'app-view-instance-details',
  templateUrl: './view-instance-details.component.html',
  styleUrls: ['./view-instance-details.component.css']
})
export class ViewInstanceDetailsComponent implements OnInit {

  result:any[]=['name','email','pass','gggg','hh'];

  instance:Instance=new Instance();



  constructor() { }

  ngOnInit(): void {
    this.instance.instanceId="122";


  }

}

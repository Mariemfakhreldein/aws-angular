import { Component, OnInit } from '@angular/core';
import {InstanceModel} from "../../../models/instances/instance.models";

@Component({
  selector: 'app-view-instance-details',
  templateUrl: './view-instance-details.component.html',
  styleUrls: ['./view-instance-details.component.css']
})
export class ViewInstanceDetailsComponent implements OnInit {

  result:any[]=['name','email','pass','gggg','hh'];

  instance:InstanceModel=new InstanceModel();



  constructor() { }

  ngOnInit(): void {
    this.instance.instanceId="122";


  }

}

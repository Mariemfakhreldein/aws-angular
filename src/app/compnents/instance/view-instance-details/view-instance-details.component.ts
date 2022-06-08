import { Component, OnInit } from '@angular/core';
import {InstanceModel} from "../../../models/instances/instance.models";
import {InstanceService} from "../../../services/instance.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-instance-details',
  templateUrl: './view-instance-details.component.html',
  styleUrls: ['./view-instance-details.component.css']
})
export class ViewInstanceDetailsComponent implements OnInit {

  result:any[]=['name','email','pass','gggg','hh'];

  instance:InstanceModel=new InstanceModel();  //
  instances:InstanceModel=new InstanceModel();



  constructor(private _activatedRoute:ActivatedRoute,private instanceService: InstanceService ) { }

  ngOnInit(): void {

    this._activatedRoute.paramMap
      .subscribe(
        parms=>{
          let id=parms.get('id');
          this.getInstanceDetails(id);
          console.log(id);
        }
      );


    //
    // this.instance.instanceId="122";
    // this.instance.name=""
    // this.instances.id=3444







  }

  private getInstanceDetails(id: string) {
    this.instanceService.getInstanceById(id).subscribe({
      next: (response:any) =>{
        this.instances=response;
        console.log(this.instances);
      },
      error: (e) => console.error(e+"errorr"),
      complete: () => console.info('complete')
    }) ;
  }


}

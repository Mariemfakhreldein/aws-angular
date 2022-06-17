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

  id;

  result:any[]=['name','email','pass','gggg','hh'];

  // instance:InstanceModel=new InstanceModel();  //
  instance:InstanceModel=new InstanceModel();


  constructor(private _activatedRoute:ActivatedRoute,private instanceService: InstanceService ) { }

  ngOnInit(): void {

    this._activatedRoute.paramMap
      .subscribe(
        parms=>{
          this.id=parms.get('id');
          this.getInstanceDetails(this.id);
          console.log(this.id);
        }
      );
  }

  private getInstanceDetails(id: string) {
    this.instanceService.getInstanceById(id).subscribe({
      next: (response:any) =>{
        this.instance=response;
      },
      error: (e) => console.error(e+"errorr"),
      complete: () => console.info('complete')
    }) ;
  }

  isReadMore = true;

  showText() {
    this.isReadMore = !this.isReadMore;
  }


  checkValue(e: any){
      if (e.target.checked) {

        this.instanceService.startInstance(this.id).subscribe({
          next: (data:any) =>{

            console.log("instance started"+data);
          },
          error: (e) => console.error(e+"errorr"),
          complete: () => console.info('complete')
        });



      } else {

        this.instanceService.stopInstance(this.id).subscribe({
          next: (data:any) =>{

            console.log("instance stoped"+data);
          },
          error: (e) => console.error(e+"errorr"),
          complete: () => console.info('complete')
        });

      }
  }





}

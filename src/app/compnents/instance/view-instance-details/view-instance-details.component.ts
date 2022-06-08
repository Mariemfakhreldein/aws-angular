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

  // instance:InstanceModel=new InstanceModel();  //
  instance:InstanceModel=new InstanceModel();
  isChecked: any;


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
  }

  private getInstanceDetails(id: string) {
    this.instanceService.getInstanceById(id).subscribe({
      next: (response:any) =>{
        this.instance=response;
        if(this.instance.state=="Running"){
          this.isChecked=true;
        }else {
          this.isChecked=false;
        }
      },
      error: (e) => console.error(e+"errorr"),
      complete: () => console.info('complete')
    }) ;
  }

  changeInstanceStatus(){

    if(this.isChecked){

      this.instanceService.stopInstance(this.instance.instanceId).subscribe({
        next: (data:any) =>{

        },
        error: (e) => console.error(e+"errorr"),
        complete: () => console.info('complete')
      });



    }
    else{

      this.instanceService.startInstance(this.instance.instanceId).subscribe({
        next: (data:any) =>{
        },
        error: (e) => console.error(e+"errorr"),
        complete: () => console.info('complete')
      });


    }


  }






















  next(){
    let currentIndex= this.instance.id;



  }

  previous(){


  }


}

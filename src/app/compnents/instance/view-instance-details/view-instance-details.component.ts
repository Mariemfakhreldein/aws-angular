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

  isSuccess=false;
  isLoading=true;
  terminated=false;
  currentItem='Instance';
  action='Terminated';

  constructor(private _activatedRoute:ActivatedRoute,private instanceService: InstanceService ) { }

  ngOnInit(): void {

    this._activatedRoute.paramMap
      .subscribe(
        parms=>{
          this.id=parms.get('id');
          this.getInstanceDetails(this.id);
        }
      );
  }

  private getInstanceDetails(id: string) {
    this.instanceService.getById(id).subscribe({
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

          },
          error: (e) => console.error(e+"errorr"),
          complete: () => console.info('complete')
        });



      } else {

        this.instanceService.stopInstance(this.id).subscribe({
          next: (data:any) =>{
          },
          error: (e) => console.error(e+"errorr"),
          complete: () => console.info('complete')
        });

      }
  }


  terminate(){
    this.terminated = true;
    this.instanceService.terminate(this.id).subscribe({
      next: (data:any) =>{

      },
      error: (e) => {
        if(e.status == 200){
          this.isLoading=false;
          this.isSuccess=true;
        }else{
          this.isLoading=false;
          this.isSuccess=false;
        }

      },
      complete: () => console.info('complete')
    })

    this.ngOnInit();

  }

  getIsSuccess(): boolean{
    return this.isSuccess;
  }


}

//creation time on seconds + time to live in seconds - current time in seconds

import { Component, OnInit } from '@angular/core';
import {InstanceService} from "../../../services/instance.service";
import {InstanceModel} from "../../../models/instances/instance.models";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {Subscription, timer} from "rxjs";
import {InstanceDateModel} from "../../../models/instances/instance.date.model";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-view-instances',
  templateUrl: './view-instances.component.html',
  styleUrls: ['./view-instances.component.css']
})
export class ViewInstancesComponent implements OnInit {


  instances:InstanceModel[]=[];
  instancesBackup:InstanceModel[]=[];

  instanceTime:InstanceDateModel[]=new Array<InstanceDateModel>();

  //count down
  countDown: Subscription;
  counter = (Date.now() - new Date('2022-06-26 15:00:32.967527').getTime() )/1000/60;
  tick = 1000;

  statusArray:string[]=[];
  // statusArray:string[]=['running','stopped','running','stopped','running','stopped','running'];

  page:number=1;
  status:string='Running'

  pipe = new DatePipe("en");
  constructor(private instanceService: InstanceService , private authService: AuthService,private router: Router) { }

  canCreateTerminateAssignInstance: boolean = false

  ngOnInit(): void {

    this.getInstances();
    this.canCreateTerminateAssignInstance = this.authService.containPrivilege('CREATE_TERMINATE_ASSIGN_INSTANCE');

    this.countDown = timer(0, this.tick).subscribe(() => --this.counter);
    // this.getInstanceTime(1);
    // console.log("********************************"+this.instanceTime)

    console.log("---------------------------------------------------------------------")
    console.log(this.pipe.transform(Date.now(),'dd/mm/yy hh:mm:ss') + "++ current time ");
    console.log(this.pipe.transform(Date.now(),'dd/mm/yy hh:mm:ss'))
    console.log(new Date('2022-06-26 15:00:32.967527').getTime());
    console.log((Date.now() - new Date('2022-06-26 15:00:32.967527').getTime() )/1000/60);

  }


  getInstances(){
    this.instanceService.getAllInstances().subscribe({
      next: (data:any) =>{

        data.listOfInstance.forEach(e => {

          console.log(e);

          this.instances.push(e);
          this.statusArray.push(e.state);
          this.instancesBackup.push(e);

          this.instanceTime.push(e.creationDateTime,e.timeToLiveInMinutes);

          console.log("********************************"+this.instanceTime)
        })

        console.log(this.statusArray);

      },
      error: (e) => console.error(e+"errorr"),
      complete: () => console.info('complete')
    }) ;
  }
  changeInstanceStatus(instance:InstanceModel ,currentIndex:number){



    if( instance.state==='Running'){

      this.instanceService.stopInstance(instance.instanceId).subscribe({
        next: (data:any) =>{

          console.log("data"+data);
          this.statusArray[currentIndex]='Stopped';
          this.status='Stopped';
          console.log("statArray in run"+this.statusArray[currentIndex]);
          this.getBackUpInstances();
        },
        error: (e) => console.error(e+"errorr"),
        complete: () => console.info('complete')
      });



    }
    else{

      this.instanceService.startInstance(instance.instanceId).subscribe({
        next: (data:any) =>{

          console.log("data"+data);
          this.statusArray[currentIndex]='Running';
          this.status='Running';
          console.log("statArray in stop"+this.statusArray[currentIndex]);
          // this.router.navigate((['/instances']));
          this.getBackUpInstances();
        },
        error: (e) => console.error(e+"errorr"),
        complete: () => console.info('complete')
      });


    }


  }


  getTotalNumberOfRunningInstances():number{

    let runningCounter = 0;
    this.statusArray.forEach(s =>{
      if (s ==="Running"){

        runningCounter++;

      }
   })

    console.log("running"+runningCounter);
    return runningCounter;

  }

  getTotalNumberOfStoppedInstances():number{

    let stoppedCounter = 0;
    this.statusArray.forEach(s =>{
      if (s ==="Stopped"){

        stoppedCounter++;

      }
    })

    console.log("stopped"+stoppedCounter);
    return stoppedCounter;

  }

  getNumberOfInstances():number{

    console.log("totalll"+this.instances.length);
    return this.instances.length;

  }

  getBackUpInstances(){

    let i = 0;
    this.instancesBackup.forEach(e=>{
      e.state=this.statusArray[i];
      i++;
    });


  }


  public getTimer(){

    let counter;
    for (const i of this.instanceTime) {
     console.log("*%%%%%*%*%*"+i);

    }
  }

}

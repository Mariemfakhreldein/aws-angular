import { Component, OnInit } from '@angular/core';
import {InstanceService} from "../../../services/instance.service";
import {InstanceModel} from "../../../models/instances/instance.models";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {Subscription, timer} from "rxjs";

@Component({
  selector: 'app-view-instances',
  templateUrl: './view-instances.component.html',
  styleUrls: ['./view-instances.component.css']
})
export class ViewInstancesComponent implements OnInit {
  clicked:boolean = false;

  instances:InstanceModel[]=[];
  instancesBackup:InstanceModel[]=[];

  //count down
  countDown: Subscription;
  counter = 1800;
  tick = 1000;

  statusArray:string[]=[];
  // statusArray:string[]=['running','stopped','running','stopped','running','stopped','running'];

  page:number=1;
  status:string='Running'

  constructor(private instanceService: InstanceService , private authService: AuthService,private router: Router) { }

  canCreateTerminateAssignInstance: boolean = false

  ngOnInit(): void {

    this.getInstances();
    this.canCreateTerminateAssignInstance = this.authService.containPrivilege('CREATE_TERMINATE_ASSIGN_INSTANCE');

    this.countDown = timer(0, this.tick).subscribe(() => --this.counter);
    // this.getInstanceTime(1);


  }


  getInstances(){
    this.instanceService.getAllInstances().subscribe({
      next: (data:any) =>{

        this.clicked = false;
        this.instances = [];
        this.statusArray=[];
        this.instancesBackup=[];

        data.listOfInstance.forEach(e => {

          console.log(e);

          this.instances.push(e);
          this.statusArray.push(e.state);
          this.instancesBackup.push(e);

        })

        console.log(this.statusArray);

      },
      error: (e) => console.error(e+"errorr"),
      complete: () => console.info('complete')
    }) ;
  }

  changeInstanceStatus(instance:InstanceModel ,currentIndex:number){

    this.clicked = true;
    if( instance.state==='running'){

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
    else if(instance.state=='stopped'){

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


  // public getInstanceTime(instanceId){
  //   this.instanceService.getInstanceById(instanceId).subscribe({
  //     next: (data:any) =>{
  //      console.log("timeToLiveInMinutes"+data.creationDateTime);
  //       console.log("timeToLiveInMinutes"+data.timeToLiveInMinutes);
  //
  //     },
  //     error: (e) => console.error(e+"errorr"),
  //     complete: () => console.info('complete')
  //   });
  // }


}

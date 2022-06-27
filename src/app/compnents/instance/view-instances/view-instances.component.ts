//creation time on seconds + time to live in seconds - current time in seconds

import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class ViewInstancesComponent implements OnInit , OnDestroy {

  clicked:boolean = false;

  instances:InstanceModel[]=[];
  instancesBackup:InstanceModel[]=[];

  instanceTime:InstanceDateModel[]=[];

  //count down
  countDown: Subscription;
  // counter = (Date.now() - new Date('2022-06-26 15:00:32.967527').getTime() )/1000/60;
  counter :any;
  counterArray:any[] =new Array();
  tick:number = 1000;

  statusArray:string[]=[];
  // statusArray:string[]=['running','stopped','running','stopped','running','stopped','running'];

  page:number=1;
  status:string='Running'


  pipe = new DatePipe("en");
  constructor(private instanceService: InstanceService , private authService: AuthService,private router: Router) { }

  canCreateTerminateAssignInstance: boolean = false
  timeDifference:any;
  timeToLive:any;
  creationDateTime:any;
  today=Date.now();
  timed = false;

  ngOnInit(): void {

    this.getInstances();
    this.canCreateTerminateAssignInstance = this.authService.containPrivilege('CREATE_TERMINATE_ASSIGN_INSTANCE');

    // this.countDown = timer(0, this.tick).subscribe(() => --this.counterArray[0]);
    // this.getInstanceTime(1);
    // console.log("********************************"+this.instanceTime)

    // console.log("---------------------------------------------------------------------")
    // console.log(this.pipe.transform(Date.now(),'dd/mm/yy hh:mm:ss') + "++ current time ");
    // console.log(this.pipe.transform(Date.now(),'dd/mm/yy hh:mm:ss'))
    // console.log(new Date('2022-06-26 15:00:32.967527').getTime());
    // console.log((Date.now() - new Date('2022-06-26 15:00:32.967527').getTime() )/1000/60);


  }


  getInstances(){
    this.counterArray=[];
    this.instanceService.getAll().subscribe({
      next: (data:any) =>{

        this.tick=1000;
        this.clicked = false;
        this.instances = [];
        this.statusArray=[];
        this.instancesBackup=[];
        this.counterArray=new Array();

        data.listOfInstance.forEach(e => {

          console.log(e);

          this.instances.push(e);
          this.statusArray.push(e.state);
          this.instancesBackup.push(e);
          console.log("timerrrrrrrr i "+e.creationDateTime);
          // (Date.now()-(new Date(creationDateTime).getTime()+new Date(timeToLive*60).getTime()))
          this.creationDateTime=new Date(e.creationDateTime).getTime();
          this.timeToLive=new Date(e.timeToLiveInMinutes).getTime(); //in sec
          // this.timeDifference=(this.today-this.creationDateTime);
          this.timeDifference= Math.abs(this.today- this.creationDateTime) / 36e5 * 60;

          console.log("creationDateTime i "+this.creationDateTime);
          console.log("timeToLive i "+ this.timeToLive);
          console.log("today i "+ this.today);
          console.log("this.timeDifference "+this.timeDifference);


          if(this.timeToLive >= this.timeDifference ){
            console.log("today i "+ this.today);
            console.log("today i "+ this.today);
            this.counter=this.timeToLive- Math.ceil(this.timeDifference);
            console.log("counterrrrrrrr i "+ this.counter);

          }else{
            this.counter=0;


          }



          this.addToCounterArray(this.counter);

          console.log("********************************"+this.counter)

        })
        console.log("counter array"+this.counterArray);
        console.log(this.statusArray);

        this.subscribeCounter();
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

    // console.log("running"+runningCounter);
    return runningCounter;

  }

  getTotalNumberOfStoppedInstances():number{

    let stoppedCounter = 0;
    this.statusArray.forEach(s =>{
      if (s ==="Stopped"){

        stoppedCounter++;

      }
    })

    // console.log("stopped"+stoppedCounter);
    return stoppedCounter;

  }

  getNumberOfInstances():number{

    // console.log("totalll"+this.instances.length);
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
     console.log("ssk" +
       ""+i);

    }
  }

  public addToCounterArray(counter){



      this.counterArray.push( counter*60);


  }

  subscribeCounter(){
    for(let i=0;i<this.counterArray.length;i++){
      console.log(this.counterArray)

      if(this.statusArray[i] != 'running'){

        this.counterArray[i] = 0;

      }

      if(this.counterArray[i]==0){

        if(this.statusArray[i] == 'running') {
          this.instanceService.stopInstance(this.instancesBackup[i].instanceId).subscribe();
        }
        this.timed = false;
        this.countDown=timer(0, 0).subscribe(() =>{
          // this.setFormData();
        });

      }else{
        console.log("counterarrayyyyyyyyy"+this.counterArray[i]);
        this.timed = true
        this.countDown = timer(0, this.tick).subscribe(() => {
          if(this.counterArray[i]>0){
            --this.counterArray[i];
          }

        });

      }

    }

  }

  ngOnDestroy() {
    this.countDown = null;
  }

  private setFormData() {

    this.countDown.unsubscribe();
  }


}

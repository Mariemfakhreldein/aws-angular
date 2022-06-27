//creation time on seconds + time to live in seconds - current time in seconds

import { Component, OnDestroy, OnInit } from '@angular/core';
import { InstanceService } from "../../../services/instance.service";
import { InstanceModel } from "../../../models/instances/instance.models";
import {Router, Routes} from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { Subscription, timer } from "rxjs";
import { InstanceDateModel } from "../../../models/instances/instance.date.model";
import { DatePipe } from "@angular/common";
import {color} from "chart.js/helpers";
import {TimerService} from "../../../services/timer.service";


@Component({
  selector: 'app-view-instances',
  templateUrl: './view-instances.component.html',
  styleUrls: ['./view-instances.component.css']
})
export class ViewInstancesComponent implements OnInit, OnDestroy {


  clicked: boolean = false;

  instances: InstanceModel[] = [];
  instancesBackup: InstanceModel[] = [];

  instanceTime: InstanceDateModel[] = [];

  //count down
  countDown: Subscription;
  tick: number = 1000;
  // counter = (Date.now() - new Date('2022-06-26 15:00:32.967527').getTime() )/1000/60;
  counter: any;
  counterArray: any[] = new Array();


  statusArray: string[] = [];
  // statusArray:string[]=['running','stopped','running','stopped','running','stopped','running'];

  page: number = 1;
  status: string = 'Running'


  pipe = new DatePipe("en");
  constructor(private instanceService: InstanceService, private authService: AuthService, private router: Router,private timerService:TimerService) { }

  canCreateTerminateAssignInstance: boolean = false
  timeDifference: any;
  timeToLive: any;
  creationDateTime: any;
  today = Date.now();
  lastStartedDateTime:any;
  timed = false;


  ngOnInit(): void {

    this.getInstances();
    this.canCreateTerminateAssignInstance = this.authService.containPrivilege('CREATE_TERMINATE_ASSIGN_INSTANCE');

  }


  getInstances() {
    this.counterArray = [];
    this.instanceService.getAll().subscribe({
      next: (data: any) => {

        this.tick = 1000;
        this.clicked = false;
        this.instances = [];
        this.statusArray = [];
        this.instancesBackup = [];
        this.counterArray = new Array();

        data.listOfInstance.forEach(e => {

          this.instances.push(e);
          this.statusArray.push(e.state);
          this.instancesBackup.push(e);
          this.creationDateTime = new Date(e.creationDateTime).getTime();
          this.timeToLive = new Date(e.timeToLiveInMinutes).getTime(); //in sec
          this.lastStartedDateTime=new Date(e.lastStartedDateTime).getTime();

          this.timeDifference=this.timerService.calculateTimeDifference(this.today,this.lastStartedDateTime);
          this.counter = this.timerService.getCounterValue(this.timeToLive,this.timeDifference);

          this.addToCounterArray(this.counter);


        })

        this.subscribeCounter();
      },
      error: (e) => console.error(e + "errorr"),
      complete: () => console.info('complete')
    });
  }

  changeInstanceStatus(instance: InstanceModel, currentIndex: number) {

    this.clicked = true;
    if (instance.state === 'running') {

      this.instanceService.stopInstance(instance.instanceId).subscribe({
        next: (data: any) => {
          this.counterArray[currentIndex] = 0;

          this.statusArray[currentIndex] = 'Stopped';
          this.status = 'Stopped';
          this.getBackUpInstances();
        },
        error: (e) => console.error(e + "errorr"),
        complete: () => console.info('complete')
      });



    }
    else if (instance.state == 'stopped') {

      this.instanceService.startInstance(instance.instanceId).subscribe({
        next: (data: any) => {
          this.statusArray[currentIndex] = 'Running';
          this.status = 'Running';
          this.getBackUpInstances();
        },
        error: (e) => console.error(e + "errorr"),
        complete: () => console.info('complete')
      });


    }


  }


  getTotalNumberOfRunningInstances(): number {

    let runningCounter = 0;
    this.statusArray.forEach(s => {
      if (s === "Running") {

        runningCounter++;

      }
    })

    return runningCounter;

  }

  getTotalNumberOfStoppedInstances(): number {

    let stoppedCounter = 0;
    this.statusArray.forEach(s => {
      if (s === "Stopped") {

        stoppedCounter++;

      }
    })

    return stoppedCounter;

  }

  getNumberOfInstances(): number {

    return this.instances.length;

  }

  getBackUpInstances() {

    let i = 0;
    this.instancesBackup.forEach(e => {
      e.state = this.statusArray[i];
      i++;
    });


  }


  public getTimer() {

    let counter;
    for (const i of this.instanceTime) {
      console.log("ssk" +
        "" + i);

    }
  }

  public addToCounterArray(counter) {



    this.counterArray.push((counter+1) * 60);


  }

  subscribeCounter() {

    console.log("kkkk"+this.counterArray);
    for (let i = 0; i < this.counterArray.length; i++) {
      if (this.statusArray[i] != 'running') {
        this.counterArray[i] = 0;
      }

      if (this.counterArray[i] == 0) {

       /* if (this.statusArray[i] == 'running') {
          this.instanceService.stopInstance(this.instancesBackup[i].instanceId).subscribe();
        }*/
        this.timed = false;
        this.countDown = timer(0, 0).subscribe(() => {
          // this.setFormData();
        });

      } else {
        this.timed = true
        this.countDown = timer(0, this.tick).subscribe(() => {

          if (this.counterArray[i] > 0) {
            --this.counterArray[i];
            if(Math.ceil(this.counterArray[i])==0){
              this.countDown = null;
              this.counterArray[i]=0;
            }
          }else{
            this.counterArray[i]=0;
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

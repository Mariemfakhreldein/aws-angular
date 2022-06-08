import { Component, OnInit } from '@angular/core';
import {InstanceService} from "../../../services/instance.service";
import {InstanceModel} from "../../../models/instances/instance.models";

@Component({
  selector: 'app-view-instances',
  templateUrl: './view-instances.component.html',
  styleUrls: ['./view-instances.component.css']
})
export class ViewInstancesComponent implements OnInit {


  instances:InstanceModel[]=[];

  // statusArray:string[]=[];
  statusArray:string[]=['running','stopped','running','stopped','running','stopped','running'];

  page:number=1;
  status:string='running'

  constructor(private instanceService: InstanceService ) { }

  ngOnInit(): void {


    console.log("********");
    this.instanceService.getAllInstances().subscribe({
      next: (data:any) =>{

        data.listOfInstance.forEach(e => {
          console.log(e);
          this.instances.push(e);
          this.statusArray.push(e.status);
        })

       console.log("data"+data.listOfInstance);
      },
      error: (e) => console.error(e+"errorr"),
      complete: () => console.info('complete')
    }) ;



    console.log("******kkkkkkkkkkkk**");
  }

  changeInstanceStatus(instance:InstanceModel ,currentIndex:number){



      if( instance.state==='running'){

          this.instanceService.stopInstance(instance.instanceId).subscribe({
            next: (data:any) =>{

              console.log("data"+data);
              this.statusArray[currentIndex]='stopped';
              this.status='stopped';
              console.log("statArray in run"+this.statusArray[currentIndex]);
            },
            error: (e) => console.error(e+"errorr"),
            complete: () => console.info('complete')
          });



        }
        else{

          this.instanceService.startInstance(instance.instanceId).subscribe({
            next: (data:any) =>{

              console.log("data"+data);
              this.statusArray[currentIndex]='running';
              this.status='running';
              console.log("statArray in stop"+this.statusArray[currentIndex]);
            },
            error: (e) => console.error(e+"errorr"),
            complete: () => console.info('complete')
          });


        }
      }


  getTotalNumberOfRunningInstances():number{

    let runningCounter = 0;
    this.statusArray.forEach(s =>{
      if (s ==="running"){

        runningCounter++;

      }
   })

    console.log("running"+runningCounter);
    return runningCounter;

  }

  getTotalNumberOfStoppedInstances():number{

    let stoppedCounter = 0;
    this.statusArray.forEach(s =>{
      if (s ==="stopped"){

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







  // rebootInstance(){
  //
  //   console.log("stopInstance");
  //
  // }

}

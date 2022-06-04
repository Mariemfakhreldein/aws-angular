import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-instances',
  templateUrl: './view-instances.component.html',
  styleUrls: ['./view-instances.component.css']
})
export class ViewInstancesComponent implements OnInit {


  result:string[]=['hh','hhh','kkkk','gggg','hh'];
  statusArray:string[]=['running','stopped','running','stopped','running'];

  totalLength:any;
  page:number=1;
  status:string='running'

  constructor() { }

  ngOnInit(): void {

    this.totalLength=this.result.length;
    console.log(this.totalLength);
  }

  changeInstanceStatus(currentStatus: string, currentIndex: number){



      if( currentStatus==='running'){
        this.statusArray[currentIndex]='stopped';
        this.status='stopped';
        console.log("statArray in run"+this.statusArray[currentIndex]);

      }
      else{
        this.statusArray[currentIndex]='running';
        this.status='running';
        console.log("statArray in stop"+this.statusArray[currentIndex]);
      }






    console.log("startInstance");

  }



  rebootInstance(){

    console.log("stopInstance");

  }

}

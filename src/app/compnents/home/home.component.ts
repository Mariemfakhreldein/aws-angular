import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {GoogleChartInterface, GoogleChartType} from "ng2-google-charts";
import {StatisticsService} from "../../services/statistics.service";
import {StatisticsModel} from "../../models/statistics/statistics.model";
import {Observable} from "rxjs";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 statisticModel : StatisticsModel;
 canViewStatistics: boolean = false;

  onInstance:number;
  offInstance:number;
  pendInstance:number;
  constructor(private authService: AuthService, private http: HttpClient, private statisticsService : StatisticsService) {

  }

  ngOnInit(): void {
    const privileges = this.authService.getPrivileges();
    // privileges.forEach(p => console.log(p));
    this.canViewStatistics=this.authService.containPrivilege('VIEW_STATISTICS');
    this.getData();
  }
  pieChart: GoogleChartInterface={
    chartType : GoogleChartType.PieChart,
    dataTable:[
      ['Instance' , 'Status'],
      ['ON',0],
      ['OFF',0],
      ['PENDING',0]
    ]
  };

  passValues(onInstance , offInstance, pendInstance):void
  {
    this.pieChart={
      chartType : GoogleChartType.PieChart,
      dataTable:[
        ['Instance' , 'Status'],
        ['ON',onInstance],
        ['OFF',offInstance],
        ['PENDING',pendInstance]
      ]};
  }
getData() {
  let insideObj:StatisticsModel;
  this.statisticsService.getAll().subscribe(

  (response:any)=>{
    this.statisticModel =response;
    console.log(this.statisticModel.numberOfInstance);
    this.passValues(response.numberOfOnInstance , response.numberOfOffInstance, response.numberOfPendingInstance);
    },(error:any)=>{
    console.log("fail Hello", error);
  }
)
}

}

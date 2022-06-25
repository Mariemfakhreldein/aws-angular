import { Component, OnInit } from '@angular/core';
import { InstanceLogsModel } from 'src/app/models/instances/instance.logs.model';
import { InstanceLogsService } from 'src/app/services/instance-logs.service';

@Component({
  selector: 'app-view-instances-logs',
  templateUrl: './view-instances-logs.component.html',
  styleUrls: ['./view-instances-logs.component.css']
})
export class ViewInstancesLogsComponent implements OnInit {

  allInsatanceLogs: InstanceLogsModel[] = [];
  page = 1;
  constructor(private instanceLogsService: InstanceLogsService,) { }

  ngOnInit(): void {

    this.getAllInstancesLogs();
  }

  getAllInstancesLogs() {
    this.instanceLogsService.getAllInstancesLogs().subscribe(
      {
        next: (data: any) => {
          if (data.statusCode == 200) {
            console.log(data);
            data.message.forEach(e => {
              this.allInsatanceLogs.push(e);
            }
            )
          }
        }
      }
    );
  }


}

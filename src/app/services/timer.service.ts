import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {



  constructor() { }

  public calculateTimeDifference(today,lastStartedDateTime):any{

    return Math.abs(today - lastStartedDateTime) / 36e5 * 60;
  }

  public getCounterValue(timeToLive,timeDifference):any{
     if (timeToLive >= timeDifference) {

      return   timeToLive - Math.ceil(timeDifference);

    } else {
       return  0;

    }
  }

}

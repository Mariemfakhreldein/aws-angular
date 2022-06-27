import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'instanceTimer'
})
export class InstanceTimerPipe implements PipeTransform {

  transform(value: any): string {
    // const minutes: any = Math.floor(value / 60);
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value % 3600) / 60);
    return (
      ("00" + hours).slice(-2) +
      ":" +
      ("00" + minutes).slice(-2) +
      ":" +
      ("00" + Math.floor(value - minutes * 60)).slice(-2)
    );
  }

}

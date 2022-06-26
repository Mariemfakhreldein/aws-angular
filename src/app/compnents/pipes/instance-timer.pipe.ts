import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'instanceTimer'
})
export class InstanceTimerPipe implements PipeTransform {

  transform(value: number): string {
    // const minutes: number = Math.floor(value / 60);
    const minutes: number = Math.floor(value );
    return (
      ("00" + value).slice(-2) +
      ":" +
      ("00" + Math.floor(value - minutes * 60)).slice(-2))
  }

}

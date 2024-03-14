import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
  standalone: true
})
export class FormatTimePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
@Pipe({
  name: 'myTime',
  standalone: true
})
export class MyTimePipe implements PipeTransform {
  h!:Number
  v!:Number
  t:Number=0
  s:Number=0

  transform(value: number): string {
     if(value > 0 && value/60 < 1) {
       return value + ' Minutes';

     } else {

       this.h=value
       this.v=Math.floor(value / 60)
      this.t = parseInt(this.v.toString()) * 60;
      this.s = Number(this.h) - Number(this.t);
      return this.v + ' Hours and ' + this.s + ' Minutes';
     }
  }
}
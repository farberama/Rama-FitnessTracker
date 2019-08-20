import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'convertDuration'
})
export class ConvertDurationPipe implements PipeTransform {
  transform(value: any) {
    let hours: any = Math.floor(value / 60);
    hours = hours > 9 ? `${hours}` : `0${hours}`;
    let minutes: any = Math.floor(value % 60);
    minutes = minutes > 9 ? `${minutes}` : `0${minutes}`;
    let seconds: any = Math.round((value * 60) % 60);
    seconds = seconds > 9 ? `${seconds}` : `0${seconds}`;

    console.log(`${hours}:${minutes}:${seconds}`, value);

    return `${hours}:${minutes}:${seconds}`;
  }
}

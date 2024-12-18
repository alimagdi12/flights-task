import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeConverter',
  standalone: false,
})
export class TimeConverterPipe implements PipeTransform {
  transform(minutes: number): string {
    if (isNaN(minutes) || minutes < 0) return 'Invalid period';

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  }
}

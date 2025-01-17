import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeHyphens',
  standalone: true,
})
export class RemoveHyphensPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/-/g, '');
  }
}

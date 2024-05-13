import { Pipe, PipeTransform } from '@angular/core';
import { ITour } from 'src/app/models/tours';

@Pipe({
  name: 'searchTour'
})
export class SearchTourPipe implements PipeTransform {

  transform(tours: ITour[] | [], search: string): ITour[] | []  {
    if (typeof tours !== 'undefined' && tours.length > 0) {

      return tours.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
    }
    return tours;
  }

}

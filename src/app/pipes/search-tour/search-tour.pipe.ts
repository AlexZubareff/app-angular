import { Pipe, PipeTransform } from '@angular/core';
import { ITour } from 'src/app/models/tours';

@Pipe({
  name: 'searchTour'
})
export class SearchTourPipe implements PipeTransform {

  transform(tours: ITour[], search: string): ITour[] {
    return tours.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
  }

}

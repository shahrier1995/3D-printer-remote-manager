import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
  error: string;
  solution: string;
  date: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {error: 'Test Error 1', solution: 'Solution for Test Error 1', date: '12/02/2020'},
  {error: 'Test Error 2', solution: 'Solution for Test Error 2', date: '11/05/2021'},
  {error: 'Another Error', solution: 'Solution for Another Error', date: '09/18/2022'},
  // Add more dummy data as needed
];

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent {
  displayedColumns: string[] = ['error', 'solution', 'date'];
  dataSource = ELEMENT_DATA;
}

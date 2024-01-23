import { Component, Input,OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';


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
  selector: 'app-print-section',
  templateUrl: './print-section.component.html',
  styleUrls: ['./print-section.component.css'],
  animations: [
    trigger('incrementAnimation', [
      state('0', style({ content: '"0%"' })),
      state('100', style({ content: '"100%"' })),
      transition('* => *', [animate('10s')]),
    ]),
  ],
})
export class PrintSectionComponent {

  @Input() fileName: string = '';
  @Input() uploadedFileName: string = '';
  displayedColumns: string[] = ['error', 'solution', 'date'];
  dataSource = ELEMENT_DATA;
  progressValue: number = 0;
  progressState: string = 'start';



  terminalText: string = 'Welcome to the terminal!\n$ ';
  inputText: string = '';
  checkbox1: boolean = false;
  checkbox2: boolean = false;
  showPrintAbout: boolean = false
  showPrintDone: boolean = false
  printStatusText: string = '';
  
  
  ngOnInit() {


    const fileForPrintNow = localStorage.getItem('fileListForPrint');
    const fileForPrint = fileForPrintNow ? JSON.parse(fileForPrintNow) : null;
    
    // Check if fileListForPrint is not null and has at least one item
    if (fileForPrint && fileForPrint.length > 0) {
      const fileStatusForPrint = fileForPrint[0].status
      console.log(fileStatusForPrint)
      if(fileStatusForPrint == "Printing"){
        console.log("adadasdads")
        const filenameForPrint =fileForPrint[0].fileName ;
        this.fileName = filenameForPrint
        this.showPrintAbout = true
        console.log(filenameForPrint)
      }

    }
    const printStatus = localStorage.getItem("printStatus");

    if (!printStatus) {
      // If printStatus is not set in local storage, set it to 'Done' and refresh the page
      localStorage.setItem("printStatus", "Not Done");
      window.location.reload();
    } else {
      if (printStatus !== "Done") {
        this.printStatusText = this.showPrintAbout ? 'Printing' : 'Operational';
  
        if (this.showPrintAbout) {
          this.startProgressAnimation();
          
          // Set a timeout to change the print status text after 10 seconds
          setTimeout(() => {
            this.printStatusText = 'Print Done';
            localStorage.setItem("printStatus", "Done");
            window.location.reload();
          }, 10000);
        }
      } else {
        this.printStatusText = 'Print Done';
      }
    }


    // Retrieve the status from localStorage
const statusString = localStorage.getItem('fileListForPrint');

// Parse the status to get an array of items
const fileListForPrint = statusString ? JSON.parse(statusString) : [];

// Retrieve the status of the first item directly and assign it to a variable
const firstItemStatus = fileListForPrint.length > 0 ? fileListForPrint[0].status : undefined;


  }
  private startProgressAnimation() {
    setInterval(() => {
      if (this.progressValue < 100) {
        this.progressValue += 1;
      }
    }, 100);
  }
  sendMessage() {
    if (this.inputText.trim() !== '') {
      this.terminalText += `\n${this.inputText}\n$ `;
      this.inputText = ''; // Clear the input after sending
    }
  }

}

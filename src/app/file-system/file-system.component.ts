import { EventEmitter, Output, Component,ElementRef, Renderer2,OnInit } from '@angular/core';
import { interval } from 'rxjs';

const DEFAULT_FILE_LIST = [
  { id: 1, fileName: 'Example.gcode', printDateTime: '2023-10-01 02:08:00', status: 'Completed', size: '500 MB', filamentType:'PLA', filamentColor: 'Black' },
  { id: 2, fileName: 'Example2.gcode', printDateTime: '2023-10-02 01:34:00', status: 'Failed', size: '230 MB', filamentType:'PLA', filamentColor: 'Black' },
  { id: 3, fileName: 'Example3.gcode', printDateTime: '2023-10-03 00:48:00', status: 'Completed', size: '147 MB', filamentType:'PETG', filamentColor: 'Black' },
  { id: 4, fileName: 'Example4.gcode', printDateTime: '2023-10-04 03:15:00', status: 'Failed', size: '315 MB', filamentType:'PETG', filamentColor: 'Black' },
  { id: 5, fileName: 'Example5.gcode', printDateTime: '2023-10-05 04:22:00', status: 'Completed', size: '421 MB', filamentType:'PLA', filamentColor: 'Black' },
  // Add more file entries with respective print dates and times as needed
];
@Component({
  selector: 'app-file-system',
  templateUrl: './file-system.component.html',
  styleUrls: ['./file-system.component.css']
})

export class FileSystemComponent implements OnInit  {

  // Inside your component class
constructor(private renderer: Renderer2) {

 }
  
 ngOnInit() {
  // Load file list from localStorage or use the default list
  const savedFileList = localStorage.getItem('fileList');
  console.log(savedFileList)
  if (savedFileList) {
    this.fileList = JSON.parse(savedFileList);
    this.filteredFileList = this.fileList;
  } else {
    this.fileList = DEFAULT_FILE_LIST;
    console.log(this.fileList)
    this.filteredFileList = this.fileList;
    this.saveFileListToLocalStorage();
  }
}

saveFileListToLocalStorage(): void {
  console.log(this.fileList)
  console.log(JSON.stringify(this.fileList))
  localStorage.setItem('fileList', JSON.stringify(this.fileList));
}

  @Output() fileSelected = new EventEmitter<string>();

  fileList = [
    { id: 1, fileName: 'Example.gcode', printDateTime: '2023-10-01 02:08:00', status: 'Completed', size: '500 MB', filamentType:'PLA', filamentColor: 'Black' },
    { id: 2, fileName: 'Example2.gcode', printDateTime: '2023-10-02 01:34:00', status: 'Failed', size: '230 MB', filamentType:'PLA', filamentColor: 'Black' },
    { id: 3, fileName: 'Example3.gcode', printDateTime: '2023-10-03 00:48:00', status: 'Completed', size: '147 MB', filamentType:'PETG', filamentColor: 'Black' },
    { id: 4, fileName: 'Example4.gcode', printDateTime: '2023-10-04 03:15:00', status: 'Failed', size: '315 MB', filamentType:'PETG', filamentColor: 'Black' },
    { id: 5, fileName: 'Example5.gcode', printDateTime: '2023-10-05 04:22:00', status: 'Completed', size: '421 MB', filamentType:'PLA', filamentColor: 'Black' },
    // Add more file entries with respective print dates and times as needed
  ];
  currentPage = 1;
  itemsPerPage = 5; // Adjust as needed

  // Function to get the paginated list based on currentPage and itemsPerPage
  getPaginatedList(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredFileList.slice(startIndex, endIndex);
  }

    // Function to get an array of page numbers based on the total items and items per page
    getPageNumbers(): number[] {
      const totalItems = this.filteredFileList.length;
      const totalPages = Math.ceil(totalItems / this.itemsPerPage);
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
  
    // Function to get the last page number
    getLastPage(): number {
      return Math.ceil(this.filteredFileList.length / this.itemsPerPage);
    }

  // Function to change the current page
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  sortKeys: { [key: string]: boolean } = {}; // Sorting state for each key
  statusFilter = 'all';
  filteredFileList = this.fileList.sort((a, b) => {
    return new Date(b.printDateTime).getTime() - new Date(a.printDateTime).getTime();
  });  // Initialize with all files
  files: any=[];
  selectedFile: any;  // Store the selected file for details popup

  // Function to toggle the details popup
  toggleDetails(file: any) {
    if (this.selectedFile === file) {
      this.selectedFile = null; // Hide details if already open
    } else {
      this.selectedFile = file;
    }
  }
  sort(key: string) {
    this.sortKeys[key] = !this.sortKeys[key];
    this.filteredFileList.sort((a: any, b: any) => {
      const valueA = a[key].toLowerCase();
      const valueB = b[key].toLowerCase();
      if (key === 'printDateTime') {
        // For the 'printDateTime' key, reverse the comparison for descending order
        return this.sortKeys[key] ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
      } else {
        // For other keys, use the original logic
        return this.sortKeys[key] ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
    });
  }

  filterFiles() {
    if (this.statusFilter === 'all') {
      this.filteredFileList = this.fileList;  // Show all files
    } else {
      this.filteredFileList = this.fileList.filter(file => file.status === this.statusFilter);
    }
  }
  selectedFiles: File[] = [];

// Function to handle file selection and open the modal
onFileSelected(event: any): void {
  this.files = event.target.files;
  this.saveFileListToLocalStorage();
  this.openModal()
}

// Function to open the modal
openModal() {
  const modal = document.getElementById('uploadModal');
  if (modal) {
    // Use Renderer2 to add and remove classes
    this.renderer.addClass(modal, 'show');
    this.renderer.setStyle(modal, 'display', 'block');
  }
}

printNow(event: any): void {
  console.log('Print Now clickedssssss');

  // Retrieve the existing fileList from local storage
  const existingFileListString = localStorage.getItem('fileList');
  let existingFileList = existingFileListString ? JSON.parse(existingFileListString) : [];
  
  // Retrieve the single item from fileListForPrint
  const fileListForPrintString = localStorage.getItem('fileListForPrint');
  const fileListForPrint = fileListForPrintString ? JSON.parse(fileListForPrintString) : null;
  
  // Check if fileListForPrint is not null and has at least one item
  if (fileListForPrint && fileListForPrint.length > 0) {
    // Assuming you want to update the status property
    const updatedStatus = 'Printing'; // Replace with the new status
  
    // Update the status property of the single item
    fileListForPrint[0].status = updatedStatus;
    console.log(fileListForPrint[0].status)
    localStorage.setItem('fileListForPrint', JSON.stringify(fileListForPrint))
  
    // Unshift the updated data to the beginning of the existing fileList
    existingFileList.unshift(fileListForPrint[0]);
  
    // Save the updated fileList back to local storage
    localStorage.setItem('fileList', JSON.stringify(existingFileList));
  
    // Optional: Log the updated fileList for verification
    console.log(existingFileList);

    // Use RxJS interval to schedule the status change to "Completed" after 10 seconds
    interval(10000).subscribe(() => {
      fileListForPrint[0].status = 'Completed';
      localStorage.setItem('fileListForPrint', JSON.stringify(fileListForPrint));
      console.log('Status changed to Completed after 10 seconds');
    });
  } else {
    console.error('No item in fileListForPrint');
  }
  this.closeModal();
  localStorage.setItem("printStatus", "Print Started");
  localStorage.setItem("notificationStatus", "Print Started");
  window.location.reload();
}

// Handle "Print Later" action
printLater(event: any): void {
  console.log('Print Later clicked');

  // Retrieve the existing fileList from local storage
  const existingFileListString = localStorage.getItem('fileList');
  let existingFileList = existingFileListString ? JSON.parse(existingFileListString) : [];
  
  // Retrieve the new file data from local storage
  const newFileListString = localStorage.getItem('fileListForPrint');
  const newFileList = newFileListString ? JSON.parse(newFileListString) : [];
  
  // Unshift the new data to the beginning of the existing fileList
  existingFileList.unshift(...newFileList);
  
  // Save the updated fileList back to local storage
  localStorage.setItem('fileList', JSON.stringify(existingFileList));
  
  // Optional: Log the updated fileList for verification
  console.log(existingFileList);
  
  this.closeModal();
  window.location.reload();
}

// Function to close the modal
closeModal() {
  const modal = document.getElementById('uploadModal');
  if (modal) {
    // Use Renderer2 to add and remove classes
    this.renderer.removeClass(modal, 'show');
    this.renderer.setStyle(modal, 'display', 'none');
  }
}

}

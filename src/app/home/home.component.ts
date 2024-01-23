declare var introJs: any; // Declare introJs as a global variable
import { Component ,OnInit,ViewChild, ElementRef, Renderer2} from '@angular/core';


interface Tab {
  label: string;
  active: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  fileList: any[] = [];
  
  filteredFileList : any[] = [];// Assuming fileList contains objects

    notificationCount: boolean = false; // Initial count


  ngOnInit() {
    if (!localStorage.getItem('introjs_completed')) {
      this.startTutorial();
    }
  // Load file list from localStorage or use the default list
  const savedFileList = localStorage.getItem('fileList');
  console.log(savedFileList)
  if (savedFileList) {
    this.fileList = JSON.parse(savedFileList);
  
    // Check if the first item's status is "Printing" and update it to "Completed" after 10 seconds
    if (this.fileList.length > 0 && this.fileList[0].status === 'Printing') {
      setTimeout(() => {
        this.fileList[0].status = 'Completed';
        // Optionally, save the updated fileList back to local storage
        this.saveFileListToLocalStorage();
      }, 10000); // 10 seconds delay
    }
  
    this.filteredFileList = this.fileList;
  } else {
    this.fileList = [];
    this.filteredFileList = this.fileList;
    this.saveFileListToLocalStorage();
  }

  const NotificationStatus = localStorage.getItem("notificationStatus")
  if(NotificationStatus == "Print Started"){
    setTimeout(() => {
      this.notificationCount = true;
      localStorage.setItem("notificationStatus", "Print Done");
    }, 10000);
  }
  else if(NotificationStatus == "Notification Checked"){
    this.notificationCount = false;
  }
  else{
    this.notificationCount = true;
  }

  
}
handleNotificationClick(): void {
  // Set notificationCount to false
  this.notificationCount = false;

  // Additional logic if needed
  // ...
}

checkForUpdates(): void {
  setInterval(() => {
    const savedFileList = localStorage.getItem('fileList');

    if (savedFileList) {
      this.fileList = JSON.parse(savedFileList);

      // Check if the first item's status is "Printing" and update it to "Completed" after 10 seconds
      if (this.fileList.length > 0 && this.fileList[0].status === 'Printing') {
        setTimeout(() => {
          this.fileList[0].status = 'Completed';
          // Optionally, save the updated fileList back to local storage
          this.saveFileListToLocalStorage();
          // Refresh the filteredFileList to update the table
          this.filteredFileList = this.fileList;
        }, 10000); // 10 seconds delay
      }

      // Refresh the filteredFileList to update the table
      this.filteredFileList = this.fileList;
    }
  }, 5000); // 5 seconds interval (adjust as needed)
}
    
  startTutorial() {
    const intro = introJs();
    intro.setOptions({
      steps: [
        {
          element: '.element-selector', // Replace with the first element you want to highlight
          intro: 'Here you can edit your profile and also check the profile',
          position: 'right', // Display the pop-up on the right side
          disableInteraction: true, // Prevent interaction with the step content
          tooltipClass: 'skip-step', // Add a custom CSS class for styling
          scrollTo: 'tooltip', // Scroll to the tooltip when this step is active
        },
        {
          element: '.third-element-selector', // Replace with the third element
          intro: 'Here you can check your printer errors',
          position: 'right', // Display the pop-up on the right side
          disableInteraction: true, // Prevent interaction with the step content
          tooltipClass: 'skip-step', // Add a custom CSS class for styling
          scrollTo: 'tooltip', // Scroll to the tooltip when this step is active
        },
        {
          element: '.notification-element-selector', // Replace with the third element
          intro: 'For any kind of print related notification you can visit here',
          position: 'right', // Display the pop-up on the right side
          disableInteraction: true, // Prevent interaction with the step content
          tooltipClass: 'skip-step', // Add a custom CSS class for styling
          scrollTo: 'tooltip', // Scroll to the tooltip when this step is active
        },
        {
          element: '.model-element-selector', // Replace with the third element
          intro: 'You can select pre designed model from this gallery and print it.',
          position: 'right', // Display the pop-up on the right side
          disableInteraction: true, // Prevent interaction with the step content
          tooltipClass: 'skip-step', // Add a custom CSS class for styling
          scrollTo: 'tooltip', // Scroll to the tooltip when this step is active
        },
        {
          element: '.chat-element-selector', // Replace with the third element
          intro: 'You can chat with a our bot and get quick answers of your questions',
          position: 'right', // Display the pop-up on the right side
          disableInteraction: true, // Prevent interaction with the step content
          tooltipClass: 'skip-step', // Add a custom CSS class for styling
          scrollTo: 'tooltip', // Scroll to the tooltip when this step is active
        },
      ],
      showStepNumbers: false, // Hide step numbers
       // Hide default buttons
      exitOnOverlayClick: false,
    });
    intro.onexit(() => {
      // Mark the tour as completed or perform any other actions after the tour
    });
    intro.start();

    localStorage.setItem('introjs_completed','true')
  }
  // Initial visibility states
  showWidgets = true;
  showWidgetsMenu = false;
  showPrinter = true;
  showFileList = true;
  showCameraView = false;
  showTerminalView = false;
  showTemperatureView = false;
  showGCodeViewView = false;
  showErrors = false;
  showProfile = false;
  showNotification = false;
  showModel = false;
  userRole: 'normal' | 'advanced' = 'normal';
  isCollapsed = true;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  setUserRole(role: 'normal' | 'advanced'): void {
    this.userRole = role;
    if(role == 'normal'){
      this.showWidgetsMenu = false;
    }
    else if(role == 'advanced'){
      this.showWidgetsMenu = true;
      setTimeout(() => {
        const intro = introJs();
        intro.setOptions({
          steps: [
            {
              element: '.another-element-selector', // Replace with the second element
              intro: 'You can select/deselect widget as your wish',
              position: 'right', // Display the pop-up on the right side
              disableInteraction: true, // Prevent interaction with the step content
              tooltipClass: 'skip-step', // Add a custom CSS class for styling
              scrollTo: 'tooltip', // Scroll to the tooltip when this step is active
            }
          ],
          showStepNumbers: false, // Hide step numbers
          // Hide default buttons
          exitOnOverlayClick: false,
        });
    
        intro.onexit(() => {
          // Mark the tour as completed or perform any other actions after the tour
        });
    
        intro.start();
      }, 100);
      
    }
  }

  // Selected file name
  selectedFileName = '';

  // Submenu state
  isSubMenuOpen = false;

  // List to hold the names of selected checkboxes
  selectedCheckboxes: string[] = [];

  constructor(private renderer: Renderer2) {
    this.updateSelectedCheckboxes();
  }

  // Update the selected checkboxes list whenever checkboxes change
  updateSelectedCheckboxes() {
    this.selectedCheckboxes = [];

    if (this.showPrinter) {
      this.selectedCheckboxes.push('Printer');
    }

    if (this.showFileList) {
      this.selectedCheckboxes.push('File List');
    }

    if (this.showCameraView) {
      this.selectedCheckboxes.push('Camera View');
    }
    
    if (this.showTerminalView) {
      this.selectedCheckboxes.push('Terminal');
    }
    if(this.showTemperatureView){
      this.selectedCheckboxes.push('Temperature')
    }
    if(this.showGCodeViewView){
      this.selectedCheckboxes.push('G-Code Viewer')
    }


  }
  logout(){
    localStorage.setItem("BookedPrinter", "false");
  }
  toggleSubMenu(tab: string) {
    console.log(tab);

    if (tab === 'showWidget') {
      this.showWidgets = true;
      this.showErrors = false;
      this.showProfile = false
      this.showNotification = false;
      this.showModel = false;
      this.isSubMenuOpen = !this.isSubMenuOpen; 
    } else if (tab === 'showError') {
      this.showWidgets = false;
      this.showErrors = true;
      this.showProfile = false
      this.showNotification = false;
      this.showModel = false;
      if(this.isSubMenuOpen){
        this.isSubMenuOpen = false;
      }
    }
    else if(tab === 'showProfile'){
      this.showWidgets = false;
      this.showErrors = false;
      this.showProfile = true
      this.showNotification = false;
      this.showModel = false;
      if(this.isSubMenuOpen){
        this.isSubMenuOpen = false;
      }
    }
    else if(tab === 'showNotification'){
      this.showWidgets = false;
      this.showErrors = false;
      this.showProfile = false
      this.showNotification = true;
      this.showModel = false;
      if(this.isSubMenuOpen){
        this.isSubMenuOpen = false;
      }
    }else if(tab === 'showModel'){
      this.showWidgets = false;
      this.showErrors = false;
      this.showProfile = false;
      this.showNotification = false;
      this.showModel = true;
      if(this.isSubMenuOpen){
        this.isSubMenuOpen = false;
      }
    }
    
  }
  @ViewChild('videoPlayer', { static: false }) videoPlayer: ElementRef| undefined;
  restartVideo() {
    if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement as HTMLVideoElement;
      video.currentTime = 0;
      video.play();
    }
  }

  onFileSelected(fileName: string) {
    this.selectedFileName = fileName;

  }

  openModal(files: FileList | null): void {
    const modal = document.getElementById('uploadModal');
    if (modal) {
      // Use Renderer2 to add and remove classes
      this.renderer.addClass(modal, 'show');
      this.renderer.setStyle(modal, 'display', 'block');
    }
    console.log(files)

  }
  files: any=[];
  saveFileListToLocalStorage(): void {
    localStorage.setItem('fileList', JSON.stringify(this.fileList));
  }

  printNow(event: any): void {
    console.log('Print Now clicked');
  console.log(this.files)
    if (this.files && this.files.length > 0) {
      // Iterate through the selected files
      for (let i = 0; i < this.files.length; i++) {
        const file: File = this.files[i];
        const fileName: string = file.name;
   
        // Check if the file has a .gcode extension
        if (fileName.toLowerCase().endsWith('.gcode')) {
          const printingTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
          this.fileList.push({
            id: this.fileList.length + 1,
            fileName: fileName,
            printDateTime: printingTime,  // You might want to set an appropriate printDateTime
            status: 'Printing',  // Set an appropriate initial status
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            filamentType: 'PETG',  // Set an appropriate initial filamentType
            filamentColor: 'Orange'  // Set an appropriate initial filamentColor
          });
          this.filteredFileList = this.fileList.sort((a, b) => {
            return new Date(b.printDateTime).getTime() - new Date(a.printDateTime).getTime();
          });
          this.saveFileListToLocalStorage();
          // You can also emit the file name if needed
        } else {
          // File is not a G-code file, show an error or perform appropriate action
          console.log('Only G-code files are allowed.');
        }
      }
    }
    this.closeModal();
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


  toggleWidgets() {
    this.showWidgets = !this.showWidgets;
  }


  onDragOver(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFileName=files[0].name
       // Extract file information and convert to the desired format
       const fileData = Array.from(files).map((file, index) => {
        return {
          id: index + 1,
          fileName: file.name,
          printDateTime: new Date().toISOString().slice(0, 19).replace('T', ' '), // Set an appropriate printDateTime
          status: 'Pending', // Set an appropriate initial status
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          filamentType: 'PLA', // Set an appropriate initial filamentType
          filamentColor: 'Black', // Set an appropriate initial filamentColor
        };
      });
    
      // Save the array in localStorage
      localStorage.setItem('fileListForPrint', JSON.stringify(fileData));
    
      this.openModal(files);
      //this.fileSelected.emit(files[0].name);
    }
    
  }



  onNavFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    
    console.log(files);
    
    if (files && files.length > 0) {
      // Extract file information and convert to the desired format
      const fileData = Array.from(files).map((file, index) => {
        return {
          id: index + 1,
          fileName: file.name,
          printDateTime: new Date().toISOString().slice(0, 19).replace('T', ' '), // Set an appropriate printDateTime
          status: 'Pending', // Set an appropriate initial status
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          filamentType: 'PLA', // Set an appropriate initial filamentType
          filamentColor: 'Black', // Set an appropriate initial filamentColor
        };
      });
    
      // Save the array in localStorage
      localStorage.setItem('fileListForPrint', JSON.stringify(fileData));
    
      this.openModal(files);
    }
    
  }



  

}

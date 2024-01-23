import { Component, ViewChildren, ElementRef, OnInit, AfterViewInit, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingPrinterComponent } from '../booking-printer/booking-printer.component';

export interface GalleryItem {
  Name: string;
  Status: string;
  Filament_type: string;
  Filament_color: string;
  Bed_status: string;
  Booking_status: string;
  IsBooked:string;
  Source_file:string;
}
const storedValue = localStorage.getItem("BookedPrinter") || "false";

const galleryItems: GalleryItem[] = [
  {
    Name: 'Bia',
    Status: 'Printing',
    Filament_type: 'PLA',
    Filament_color: 'Black',
    Bed_status: 'Free',
    Booking_status :'Not Reserved',
    IsBooked:"neutral",
    Source_file: "assets/video/video.mp4"

  },
  {
    Name: 'Dike',
    Status: 'Printing',
    Filament_type: 'PLA',
    Filament_color: 'Red',
    Bed_status: 'Occupied',
    Booking_status :'Reserved',
    IsBooked:"true",
    Source_file: "assets/video/video-2.mp4"
  },
  {
    Name: 'Hades',
    Status: 'Printing',
    Filament_type: 'PETG',
    Filament_color: 'Green',
    Bed_status: 'Occupied',
    Booking_status :'Reserved',
    IsBooked:"true",
    Source_file: "assets/video/video-1.mp4"
  },
  {
    Name: 'Chaos',
    Status: 'Printing',
    Filament_type: 'PLA',
    Filament_color: 'Blue',
    Bed_status: 'Occupied',
    Booking_status :'Not Reserved',
    IsBooked:storedValue,
    Source_file: "assets/video/video-3.mp4"
  }
];


@Component({
  selector: 'app-printer-selection-dashboard',
  templateUrl: './printer-selection-dashboard.component.html',
  styleUrls: ['./printer-selection-dashboard.component.css']
})
export class PrinterSelectionDashboardComponent implements OnInit, AfterViewInit {
  selectedPrinter: any;
  @ViewChildren('videoPlayer') videoPlayers: QueryList<ElementRef> | undefined;

  galleryItems: GalleryItem[] = galleryItems;

  constructor(private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    // Check the value of IsBooked in localStorage when the component is initialized
    this.checkIsBooked();
  }

  ngAfterViewInit() {
    // Access the video players in ngAfterViewInit
    if (this.videoPlayers) {
      this.videoPlayers.forEach((videoPlayer) => {
        this.setPlaybackSpeed(videoPlayer.nativeElement, 0.5); // Set the initial playback speed to half
      });
    }
  }

  setPlaybackSpeed(video: HTMLVideoElement, speed: number): void {
    video.playbackRate = speed;
  }

  getBackgroundColor(isBooked: string): string {
    if (isBooked === 'true') {
      return '#f7d1d1'; // Set the color for true status (booked)
    } else if (isBooked === 'false') {
      return '#f5f5f5'; // Set the color for false status (not booked)
    } else {
      return '#b9f6d7'; // Set the color for neutral status
    }
  }
  checkIsBooked() {
    const storedValue = localStorage.getItem('BookedPrinter') || 'false';
    // Update the IsBooked property in your galleryItems array
    if(storedValue){
      this.galleryItems[3].IsBooked = storedValue;
      this.galleryItems[3].Booking_status = 'Reserved';
    }

  }

  selectPrinter() {
    // Your logic to select a printer here
    // After selecting a printer, navigate to the home component
    this.router.navigate(['/home']);
  }

  openBookingModal(selectedPrinter: any) {
    const modalRef = this.modalService.open(BookingPrinterComponent, { size: 'lg' });

    // Pass the selected printer data to the modal
    modalRef.componentInstance.selectedPrinter = selectedPrinter;

    modalRef.result.then(
      (result) => {
        console.log('Modal closed with result:', result);
        // Handle result if needed
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
        // Handle dismiss reason if needed
      }
    );
  }

  restartVideo(video: HTMLVideoElement) {
    video.currentTime = 0;
    video.play();
  }
}





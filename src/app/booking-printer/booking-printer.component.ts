import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-booking-printer',
  templateUrl: './booking-printer.component.html',
  styleUrls: ['./booking-printer.component.css']
})
export class BookingPrinterComponent {
  @Input() selectedPrinter: any;
  bookingData: any = {}; // Object to store form data

  constructor(public activeModal: NgbActiveModal) {}
  saveChanges() {
    localStorage.setItem("BookedPrinter", "true");
    window.location.reload();
    this.activeModal.close('Booked');
  }
}
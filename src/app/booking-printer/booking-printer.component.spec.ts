import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPrinterComponent } from './booking-printer.component';

describe('BookingPrinterComponent', () => {
  let component: BookingPrinterComponent;
  let fixture: ComponentFixture<BookingPrinterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingPrinterComponent]
    });
    fixture = TestBed.createComponent(BookingPrinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

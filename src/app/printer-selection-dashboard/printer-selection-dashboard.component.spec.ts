import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterSelectionDashboardComponent } from './printer-selection-dashboard.component';

describe('PrinterSelectionDashboardComponent', () => {
  let component: PrinterSelectionDashboardComponent;
  let fixture: ComponentFixture<PrinterSelectionDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrinterSelectionDashboardComponent]
    });
    fixture = TestBed.createComponent(PrinterSelectionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

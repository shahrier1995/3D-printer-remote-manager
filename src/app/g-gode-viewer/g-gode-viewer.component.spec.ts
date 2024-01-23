import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GGodeViewerComponent } from './g-gode-viewer.component';

describe('GGodeViewerComponent', () => {
  let component: GGodeViewerComponent;
  let fixture: ComponentFixture<GGodeViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GGodeViewerComponent]
    });
    fixture = TestBed.createComponent(GGodeViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

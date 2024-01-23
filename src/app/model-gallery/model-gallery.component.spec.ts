import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelGalleryComponent } from './model-gallery.component';

describe('ModelGalleryComponent', () => {
  let component: ModelGalleryComponent;
  let fixture: ComponentFixture<ModelGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelGalleryComponent]
    });
    fixture = TestBed.createComponent(ModelGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

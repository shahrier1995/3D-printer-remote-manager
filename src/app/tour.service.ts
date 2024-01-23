import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  private tourSteps: { elementId: string; message: string }[] = [];

  addStep(elementId: string, message: string) {
    this.tourSteps.push({ elementId, message });
  }

  getSteps() {
    return this.tourSteps;
  }
}

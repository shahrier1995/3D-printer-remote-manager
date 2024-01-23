import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-camera-view',
  templateUrl: './camera-view.component.html',
  styleUrls: ['./camera-view.component.css']
})
export class CameraViewComponent {
  @ViewChild('videoPlayer', { static: false }) videoPlayer: ElementRef| undefined;


  imagePath: string = 'assets/images/image-1_1.jpg';
  imagePath2: string = 'assets/images/image-2_1.jpg';
  restartVideo() {
    if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement as HTMLVideoElement;
      video.currentTime = 0;
      video.play();
    }
  }
}

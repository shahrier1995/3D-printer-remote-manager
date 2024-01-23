import { Component } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

export interface ProfileSettings {
  username: string;
  email: string;
  bio: string;
  password:string;
}

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent {
  
  profileSettings: ProfileSettings = {
    username: 'User1',
    email: 'user@gmail.com',
    bio: '',
    password: 'Password'
  };

  tooltipContent: string = 'Current Printing status\nchalooo\nchjalooo';
  imagePath: string = 'assets/images/image-1_1.jpg';
  totalPrintTimes: number = 21;
  totalPrintObjects: number = 5;
  successRate: number = 60;

  passwordVisible = false;

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  saveSettings() {
    // Implement logic to save the profile settings
    console.log('Profile settings saved:', this.profileSettings);
  }
}

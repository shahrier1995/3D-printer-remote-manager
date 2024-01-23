import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prototype';
  isChatBoxVisible = false;

  get isLoginOrPrintSelection(): boolean {
    // Replace this with your actual logic to determine if it's login or print selection
    return window.location.pathname.includes('/login') || window.location.pathname.includes('/printerselection') ;
  }
  toggleChatBox() {
    this.isChatBoxVisible = !this.isChatBoxVisible;
  }
}

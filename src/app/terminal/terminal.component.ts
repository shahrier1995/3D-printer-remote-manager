import { Component } from '@angular/core';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent {
  terminalText: string = 'Welcome to the terminal!\n$ ';
  inputText: string = '';
  checkbox1: boolean = false;
  checkbox2: boolean = false;
  sendMessage() {
    if (this.inputText.trim() !== '') {
      this.terminalText += `\n${this.inputText}\n$ `;
      this.inputText = ''; // Clear the input after sending
    }
  }
}

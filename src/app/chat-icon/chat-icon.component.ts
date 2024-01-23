import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-icon',
  templateUrl: './chat-icon.component.html',
  styleUrls: ['./chat-icon.component.css']
})
export class ChatIconComponent {
  @Output() toggleChat = new EventEmitter<void>();

  toggleChatBox() {
    this.toggleChat.emit();
  }
}

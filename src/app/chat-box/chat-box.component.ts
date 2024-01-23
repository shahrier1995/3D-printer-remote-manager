import { Component, Input, Output,EventEmitter, ElementRef, ViewChild  } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent {
  @Input() showChatBox = false;
  @Output() closeChat = new EventEmitter<void>();

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  messages: { text: string; sent: boolean }[] = [];
  newMessage: string = '';

  constructor() {
    // Add a welcome message when the component initializes
    this.messages.push({ text: 'Welcome to the chat!', sent: false });
  }
  closeChatBox() {
    this.closeChat.emit();
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ text: this.newMessage, sent: true });
      this.newMessage = '';

      // Simulate a dummy reply after a short delay
      setTimeout(() => {
        this.messages.push({ text: 'This is a dummy reply.', sent: false });
        this.scrollChatToBottom();
      }, 500);
    }
  }

  private scrollChatToBottom() {
    if (this.chatContainer) {
      setTimeout(() => {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }, 0);
    }
  }
}

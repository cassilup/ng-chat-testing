import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/chat.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent implements OnInit {

  constructor(private chatService:ChatService) {
  }

  sendMessage = (text) => {
    this.chatService.sendMessage(text.value);
    text.value = "";
  }

  ngOnInit() {
  }

}

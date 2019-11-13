import { Injectable } from '@angular/core';
import { Message } from '../types';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = "http://localhost:3000";
  private socket;
  private messages:Message[] = [];
  private connection;

  constructor(private http: HttpClient) {
    this.socket = io(this.url);

    this.connection = this.onMessageReceived().subscribe((message:string) => {
      this.messages.push({
        text: message
      });
    });

    this.retreiveMessagesHistory();
  }

  getMessages():Array<Message> {
    return this.messages;
  }

  retreiveMessagesHistory() {
    this.http.get(`${this.url}/history`).subscribe((result: Message[]) => {
      this.messages.push(...result);
    });
  }

  sendMessage(message:string) {
    this.socket.emit('chat message', message);
  }

  onMessageReceived() {
    let observable = new Observable(observer => {
      this.socket.on('chat message', data => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    })

    return observable;
  }
}

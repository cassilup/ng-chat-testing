import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChange } from '@angular/core';
import { Message } from 'src/app/types';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnChanges {
  @Input() messages: Message[];
  @ViewChild('messagesWrapper', {static: false}) messagesWrapper: ElementRef;

  constructor() {}

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom() {
    try {
        this.messagesWrapper.nativeElement.scrollTop = this.messagesWrapper.nativeElement.scrollHeight;
    } catch (e) {
        console.error(e);
    }
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log('changes occured', changes);
  }

}

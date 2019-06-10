import {
  Component,
  OnInit,
  Output,
  Input,
  ViewChildren,
  QueryList,
  ElementRef
} from "@angular/core";

import { Observable, of, BehaviorSubject } from "rxjs";
import { MessageService } from "../../../services/src/message.service";
import { Message } from "../../../entity/src/Message";
import { config } from "../../../config";

@Component({
  selector: "app-chathistory",
  templateUrl: "./chathistory.component.html",
  styleUrls: ["./chathistory.component.css"]
})
export class ChathistoryComponent implements OnInit {
  @ViewChildren("commentDiv") commentDivs: QueryList<ElementRef>;

  chatmessages$: Observable<Message[]>;
  apiUrl: any;
  inputmessage: string = "";

  constructor(private messageService: MessageService) {
    this.chatmessages$ = this.messageService.getMessages();
    this.apiUrl = config.apiUrl;
  }

  emptyChatMessages() {
    this.messageService.emptyMessages();
  }

  sendChatMessage(messagetext: string) {
    console.log(messagetext);
    this.messageService.sendMessage(new Message(messagetext, "", ""));
    this.inputmessage = "";
  }

  onLog() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.commentDivs.changes.subscribe(() => {
      if (this.commentDivs && this.commentDivs.last) {
        this.commentDivs.last.nativeElement.focus();
      }
    });
  }
}

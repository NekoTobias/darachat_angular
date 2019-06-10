import { Message } from "entity/src/Message";

import { Injectable } from "@angular/core";
import { SocketService } from "./socket.service";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  private messages$: BehaviorSubject<Message[]> = new BehaviorSubject<
    Message[]
  >([]);

  constructor(private socketService: SocketService) {
    this.receiveMessage();
  }

  sendMessage(message: Message): void {
    this.socketService.sendMessage(message);
  }

  receiveMessage(): void {
    this.socketService.onReceiveMessage().subscribe((message: Message) => {
      this.messages$.subscribe(messages => messages.push(message));
    });
  }

  getMessages(): Observable<Message[]> {
    return this.messages$.asObservable();
  }

  emptyMessages(): void {
    this.messages$.subscribe(messages => messages.splice(0, messages.length));
  }
}

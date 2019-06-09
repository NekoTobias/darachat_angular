import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";

import * as socketIo from "socket.io-client";
import { Message } from "/entity/src/Message";

@Injectable({
  providedIn: "root"
})
export class SocketService {
  private socket: any = socketIo("https://g2ozx.sse.codesandbox.io/");
  sendMessage(message: Message) {
    this.socket.emit("sendMessage", message);
  }

  public onReceiveMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on("receiveMessage", (message: any) => {
        observer.next(Object.assign(new Message("", "", ""), message));
      });
    });
  }
}

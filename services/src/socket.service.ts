import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { config } from "../../config";
import * as socketIo from "socket.io-client";
import { Message } from "/entity/src/Message";
import { User } from "../../entity/src/User";

@Injectable({
  providedIn: "root"
})
export class SocketService {
  private socket: any = socketIo(`${config.apiUrl}`);
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

  public joinChat(user: User) {
    this.socket.emit("joinChat", user);
  }

  public onUpdateOnlineChatters(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("updateOnlineChatters", (chatters: any) => {
        console.log(chatters);
        observer.next(chatters);
        // observer.next(Object.assign(new Chatter("", "", ""), message));
      });
    });
  }
}

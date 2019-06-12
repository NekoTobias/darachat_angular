import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { AuthenticationService } from "../../../services/src/authentication.service";
import { Observable } from "rxjs";
import { SocketService } from "../../../services/src/socket.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private socketService: SocketService
  ) {
    let a = this.authenticationService.currentUserValue;
    this.socketService.joinChat(a);

    this.onlineChatters = this.socketService.onUpdateOnlineChatters();
    this.onlineChatters.subscribe();

    this.currentroom = this.socketService.onUpdateCurrentRoom();
    this.currentroom.subscribe();

    this.roomLists = this.socketService.onRoomLists();
    this.roomLists.subscribe();
  }

  private onlineChatters: Observable<any>;
  private currentroom: Observable<any>;
  private roomLists: Observable<any>;

  ngOnInit() {}
  ngDoCheck() {}
  ngOnDestroy() {
    this.socketService.leaveChat();
  }

  changeRoom(roomid: number) {
    this.socketService.changeRoom(roomid);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}

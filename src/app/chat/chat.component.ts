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
    this.onlineChatters = this.socketService.onUpdateOnlineChatters();
    this.onlineChatters.subscribe();
  }

  private onlineChatters: Observable<any>;
  ngOnInit() {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}

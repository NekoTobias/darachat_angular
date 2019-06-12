import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";
import { User } from "../../../../entity/src/User";
import { AuthenticationService } from "../../../../services/src/authentication.service";
import { UserService } from "../../../../services/src/user.service";
import { SocketService } from "../../../../services/src/socket.service";

@Component({
  templateUrl: "home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private socketService: SocketService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      }
    );
    this.onlineChatters = this.socketService.onUpdateOnlineChatters();
    this.onlineChatters.subscribe();
  }

  private onlineChatters: Observable<any>;

  ngOnInit() {
    this.loadAllUsers();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  deleteUser(id: number) {
    this.userService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.loadAllUsers();
      });
  }

  private loadAllUsers() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe(users => {
        this.users = users;
      });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}

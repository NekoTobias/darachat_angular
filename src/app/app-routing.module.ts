import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChathistoryComponent } from "./chathistory/chathistory.component";
import { ChatComponent } from "./chat/chat.component";
import { HomeComponent } from "./management/home/home.component";
import { LoginComponent } from "./management/login/login.component";
import { RegisterComponent } from "./management/register/register.component";
import { AuthGuard } from "../../guards/auth.guard";

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  // { path: "", redirectTo: "" },
  //{ path: "", component: ChatComponent, canActivate: [AuthGuard] },
  {
    path: "chathistory",
    component: ChathistoryComponent,
    canActivate: [AuthGuard]
  },
  { path: "chat", component: ChatComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

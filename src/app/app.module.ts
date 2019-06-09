import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ChathistoryComponent } from "./chathistory/chathistory.component";
import { FormsModule } from "@angular/forms";
import { SocketService } from "../../services/src/socket.service";
import { MessageService } from "../../services/src/message.service";
import { ChatComponent } from "./chat/chat.component";

import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// used to create fake backend
//import { fakeBackendProvider } from "./_helpers";
//import { routing } from "./app.routing";

//import { AlertComponent } from "./_components";
import { JwtInterceptor } from "../../helpers/jwt.interceptor";
import { ErrorInterceptor } from "../../helpers/error.interceptor";
import { HomeComponent } from "./management/home/home.component";
import { LoginComponent } from "./management/login/login.component";
import { RegisterComponent } from "./management/register/register.component";
import { AuthenticationService } from "../../services/src/authentication.service";
import { AuthGuard } from "../../guards/auth.guard";
import { UserService } from "../../services/src/user.service";

@NgModule({
  declarations: [
    AppComponent,
    ChathistoryComponent,
    ChatComponent,
    AppComponent,
    //AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
    // routing
  ],
  providers: [
    SocketService,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthenticationService,
    AuthGuard,
    UserService

    // provider used to create fake backend
    //fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

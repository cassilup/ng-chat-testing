import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChatService } from './shared/chat.service';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationService } from './shared/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageListComponent } from './components/message-list/message-list.component';
import { NewMessageComponent } from './components/new-message/new-message.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MessageListComponent,
    NewMessageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      routes
    ),
    HttpClientModule
  ],
  providers: [ChatService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

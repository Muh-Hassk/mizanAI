import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupRoutingModule } from './signup/signup-routing.module';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'chats', component:ChatSidebarComponent},
  {path: 'new', component:ChatSidebarComponent},
  {path: 'chats/:id', component:ChatSidebarComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    SignupRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

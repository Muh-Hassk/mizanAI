import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupRoutingModule } from './signup/signup-routing.module';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'profile', component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    SignupRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component } from '@angular/core';
import { iconsData } from './LoginData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  iconsData = iconsData;
  signedUpUsers: any[] = [];
  singupObj = [];
}

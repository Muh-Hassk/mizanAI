import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserData } from '../shared/interface/conversation';
import { ApiService } from '../shared/service/api.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  



  userisAuth: string|null = null;


  message = 'Hello';
  constructor(
    public translate: TranslateService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    ) 
    {
  }
  hide = true;

 
  responseData: UserData | null = null; // Use the UserData interface
 
  
  Auth!: boolean;

  ngOnInit() {
    this.api.UserisAuth().subscribe(Auth => {
      console.log(Auth);
      this.Auth = Auth;
    });

    this.api.userData().subscribe(UserData => {
      this.responseData = UserData;
    });

  }

  logout() {
    this.api.logout();
    this.router.navigate(['home']);
    this.Auth = false;
    }

}


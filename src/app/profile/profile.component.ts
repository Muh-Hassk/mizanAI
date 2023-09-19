import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
}

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
    ) 
    {
  }
  hide = true;

 
  responseData: UserData | null = null; // Use the UserData interface
 
  
  ngOnInit(): void {
    this.http.get<UserData>('http://localhost:8000/api/user', { withCredentials: true }).subscribe(
      (res: UserData) => {
        this.userisAuth = "ApprovedUsr"
        this.responseData = res; // Assign the response data to the property
        console.log(this.responseData.email);
        
      },
      err => {
        console.log(err);
      }
    );
  }
  logout() {
    this.http.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
    .subscribe(() => {
      this.userisAuth = null;
      this.router.navigate(['home']);
    });
    }

}


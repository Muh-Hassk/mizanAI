import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


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
  message = 'Hello';
  responseData: UserData | null = null; // Use the UserData interface
  constructor(
    private http: HttpClient
  ){

  }
  ngOnInit(): void {
    this.http.get<UserData>('http://localhost:8000/api/user', { withCredentials: true }).subscribe(
      (res: UserData) => {
        this.responseData = res; // Assign the response data to the property
      },
      err => {
        console.log(err);
      }
    );
  }
}


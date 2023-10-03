import { Component, Input } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UserData } from '../../interface/conversation';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  responseData: UserData | null = null; // Use the UserData interface

  constructor( private api: ApiService,) {
   
  }
  ngOnInit() {
    this.api.userData().subscribe(UserData => {
      this.responseData = UserData;
    });
  }
  @Input() role: string = '';
  @Input() content: string = '';
}


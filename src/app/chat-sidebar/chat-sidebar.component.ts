import { Component } from '@angular/core';
import { ApiService } from '../shared/service/api.service';
import { Conversation } from '../shared/interface/conversation';
import { Message } from '../shared/interface/message';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.scss']
})
export class ChatSidebarComponent {
  conversations: Conversation[] = [];

  constructor
  ( 
    private api: ApiService,
    private router: Router
  ) 
    {
   this.conversations = this.api.getConversations();
   console.log(this.conversations);
  }

}



import { Component } from '@angular/core';
import { ApiService } from '../shared/service/api.service';
import { Conversation } from '../shared/interface/conversation';
@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.scss']
})
export class ChatSidebarComponent {
  conversations: Conversation[] = [];

  constructor
  ( 
    private api: ApiService
  ) 
    {
   this.conversations = this.api.getConversations();
   console.log(this.conversations);
  }
}

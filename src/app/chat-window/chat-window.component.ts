import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from '../shared/service/api.service';
import { Message } from '../shared/interface/message';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent {
  id: string = '';
  messages: Message[] = [];
  message:string ='';

  constructor(private router: ActivatedRoute, private api: ApiService, private route: Router) {
    this.router.params.subscribe(params => {
    this.id = params['id'];
    this.messages = this.api.getConversation(this.id)?.messages || [];
    console.log(this.id, this.messages);

   

    })
  }


  sendMessage() {
    
    
    if(this.message !== ''&& this.id !== undefined) {
      this.api.addMessage(this.id,
        {
          role: 'user',
          content: this.message,
        }
        );
        this.message = '';
    }
    else {
     
        // Create a new chat with a default message
        const newChatMessage: Message = { role:'user', content: this.message };
    
        const newID = this.api.createConversation(newChatMessage)
          // After the chat is created by the API, navigate to its route
          this.route.navigate(['/chats',newID]);
      }
    }
    }
  


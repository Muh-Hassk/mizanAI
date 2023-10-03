import { Component } from '@angular/core';
import { ApiService } from '../shared/service/api.service';
import { Conversation, UserData } from '../shared/interface/conversation';
import { Message } from '../shared/interface/message';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.scss']
})
export class ChatSidebarComponent {
  conversations: Conversation[] = [];
  Auth!: boolean;
  responseData: UserData | null = null; // Use the UserData interface
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


  constructor
  ( 
    private api: ApiService,
    private router: Router
  ) 
    {
   this.conversations = this.api.getConversations();
   console.log(this.conversations);
  }

  onTrashIconClick(event: Event, conversationId: string) {
    // Prevent the click event from propagating to parent elements
    event.stopPropagation();
    this.api.deleteConversation(conversationId);
    
    // Perform actions when the Trash icon is clicked
    // You can access the conversationId here and take appropriate actions
    console.log(`Trash icon clicked for conversation with ID: ${conversationId}`);
    // Call your desired function or logic here
    console.log(this.api.getConversations());
    this.conversations = this.api.getConversations();
    this.router.navigate(['/new']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  } 
}
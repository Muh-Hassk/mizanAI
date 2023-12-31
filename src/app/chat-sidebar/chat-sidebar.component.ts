import { Component, EventEmitter } from '@angular/core';
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
  myEvent: EventEmitter<any> = new EventEmitter();


  conversations: Conversation[] | null = null;
  Auth!: boolean;
  responseData: UserData | null = null; // Use the UserData interface
  ngOnInit() {
    this.myEvent.subscribe(() => {
      // Handle the event here, possibly by reloading conversations
      this.loadConversations(); // Call the method to reload conversations
    });
    this.api.UserisAuth().subscribe(Auth => {
      this.Auth = Auth;
    });

    this.api.userData().subscribe(UserData => {
      this.responseData = UserData;
    });

    this.api.getConversations().subscribe(
      (data: Conversation[]) => {
        console.log(data);
        this.conversations = data;
        console.log(this.conversations);
      },
      (error) => {
        console.log("Data not Available", error);
      }
    );  }
  
  logout() {
    this.api.logout();
    this.router.navigate(['home']);
    this.Auth = false;
  }


  constructor
  ( 
    private api: ApiService,
    private router: Router,
    
  ) 
    {
  }

 

// ...

onTrashIconClick(event: Event, conversationId: number) {
  event.stopPropagation();
  this.api.deleteConversation(conversationId).subscribe(
    (response) => {
      console.log('Conversation deleted successfully:', response);
    },
    (error) => {
      console.error('An error occurred while deleting the conversation:', error);
      // Handle the error as necessary
    }
  );
  console.log(`Trash icon clicked for conversation with ID: ${conversationId}`);
  this.loadConversations(); // Call the method to reload the conversation list
  this.router.navigate(['/new']);
}

loadConversations() {
  this.api.getConversations().subscribe(
    (conversations) => {
      this.conversations = conversations; // Assuming this is where you store your conversation data
    },
    (error) => {
      console.error('An error occurred while loading conversations:', error);
      // Handle the error as necessary
    }
  );
}


  goToProfile() {
    this.router.navigate(['/profile']);
  } 

}
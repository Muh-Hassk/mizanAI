import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from '../shared/service/api.service';
import { Message } from '../shared/interface/message';
import { Conversation, UserData } from '../shared/interface/conversation';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent {
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {    
  }
  
  Auth!: boolean;
  responseData: UserData | null = null; // Use the UserData interface
  messages: Message[] | null = null; // Use the Message interface
  message:string ='';
  conversations: Conversation[] | null = null;

  ngOnInit() {
    this.api.UserisAuth().subscribe(Auth => {
      this.Auth = Auth;
    });

    this.api.userData().subscribe(UserData => {
      this.responseData = UserData;
    });

    this.route.paramMap.subscribe(params => {
      const conversationId = params.get('id'); // Assuming 'id' is the parameter name in your route
      if (conversationId) {
        this.api.getConversation(conversationId).subscribe(
          (data: Conversation) => {
            console.log(data);
            if (!this.conversations) {
              this.conversations = [data]; // Initialize the array if it's null and add the conversation
            } else {
              this.conversations.push(data); // Add the received conversation to the existing array
            }
            this.messages = data.messages;
          },
          (error) => {
            console.log("Data not available", error);
            // Handle the error appropriately
          }
        );
      }
    });
   
  }

  sendMessage(message: string) {
    this.route.paramMap.subscribe(params => {
      const conversationId = params.get('id'); // Assuming 'id' is the parameter name in your route
      if (conversationId && this.messages) {
        const newMessage: Message = {
          role: 'user', // Assuming a default role
          content: message,
        };
    
        this.messages.push(newMessage);
        this.api.addMessage(newMessage, conversationId).subscribe(
          response => {
            // Handle the response if necessary
          },
          error => {
            // Handle the error if necessary
          }
        );
      }
    });
  }
    
   
  


  adjustInputHeight(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.style.height = 'auto'; // Reset the height to auto to calculate the scrollHeight
    inputElement.style.height = inputElement.scrollHeight + 'px';
  }

  //sendMessage() {
    //if (this.message !== '' && this.id !== undefined) {
      //this.api.addMessage(this.id {
        //role: 'user',
        //content: this.message,
     // }).subscribe(response => {
        // Handle the response if necessary
      //}, error => {
        // Handle the error if necessary
     // });
      //this.message = '';
  //  } else if (this.message !== '' && this.id === undefined) {
     // const newChatMessage: Message = { role: 'user', content: this.message };
     // this.api.createConversation(newChatMessage).subscribe(newID => {
        // After the chat is created by the API, navigate to its route
       // this.route.navigate(['/chats', newID]);
      //}, error => {
        // Handle the error if necessary
     // });
    //}
  //}
  
}


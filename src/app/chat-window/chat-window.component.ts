import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from '../shared/service/api.service';
import { Message } from '../shared/interface/message';
import { Conversation, UserData } from '../shared/interface/conversation';
import {ChatSidebarComponent} from '../chat-sidebar/chat-sidebar.component';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent {
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, private sidebarService: ChatSidebarComponent) {    
  }
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  
  Auth!: boolean;
  responseData: UserData | null = null; // Use the UserData interface
  messages: Message[] | null = null; // Use the Message interface
  messageInput:string ='';
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
    const conversationId = this.route.snapshot.paramMap.get('id');
      console.log(conversationId);
      
      if (message.length >= 1) {
        this.messageInput = '';
        if (conversationId && this.messages) {
          const newMessage: Message = {
            role: 'user', // Assuming a default role
            content: message,
          };
          this.messages.push(newMessage);
          this.api.addMessage(newMessage, conversationId).subscribe(
            response => {
             this.getResponse(message, conversationId);
            },
            error => {
              // Handle the error if necessary
            }
          );
        } else if (conversationId == null) {
          // Handle the case when the URL has /new
          const newMessage: Message = {
            role: 'user', // Assuming a default role
            content: message,
          };
          this.api.addMessage(newMessage, 'new').subscribe(
            response => {

              this.ReloadConversations()
              const L = response
              this.getResponse(message, L.toString())
              this.router.navigate(['/chats', L.toString()]); 
              },
            error => {
              // Handle the error if necessary
            }
          );
        }
      }
      this.scrollToBottom();
}

scrollToBottom(): void {
  try {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  } catch(err) { }
}
ngAfterViewChecked() {
  this.scrollToBottom();
}
getResponse(text: string, conversationId: string) {
  this.api.AiResponse(text, conversationId).subscribe(
    response => {

      console.log("This is Ai Response "+response);
     },
     error => {
       // Handle the error if necessary
     }
   );

}


ReloadConversations() {
  this.sidebarService.myEvent.emit();
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


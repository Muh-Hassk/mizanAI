import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from '../shared/service/api.service';
import { Message } from '../shared/interface/message';
import { Conversation, UserData } from '../shared/interface/conversation';
import { ChatSidebarComponent } from '../chat-sidebar/chat-sidebar.component';


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
  isSending: boolean = false; // Variable to keep track of the sending state
  responseData: UserData | null = null; // Use the UserData interface
  messages: Message[] | null = null; // Use the Message interface
  messageInput:string ='';
  conversations: Conversation[] | null = null;

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

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
    this.isSending = true; // Disable the input field while sending the message
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
          async response => {
            const L = response;
            const aiResponse = await this.getResponse(message, L.toString());
            if (aiResponse) {
              const AiMessage: Message = {
                role: 'system', // Assuming a default role
                content: aiResponse,
              };
              this.messages?.push(AiMessage);
            }
            this.ReloadConversations();
            this.router.navigate(['/chats', L.toString()]); // Navigate after receiving the AI response
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
async getResponse(text: string, conversationId: string): Promise<string> {
  try {
    const response = await this.api.AiResponse(text, conversationId).toPromise();
    if (response) {
      console.log("This is Ai Response " + response);
      const AiMessage: Message = {
        role: 'system', // Assuming a default role
        content: response.toString(),
      };
      this.messages?.push(AiMessage);
      this.isSending = false; // Disable the input field while sending the message
      return response.toString(); // Return the response as a string
    } else {
      // Handle the case when the response is undefined
      console.error("AI response is undefined");
      this.isSending = false; // Disable the input field while sending the message
      return "";
    }
  } catch (error) {
    // Handle the error if necessary
    this.isSending = false; // Disable the input field while sending the message
    return "";
  }
}


ReloadConversations() {
  this.sidebarService.myEvent.emit();
}
   
  


  adjustInputHeight(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.style.height = 'auto'; // Reset the height to auto to calculate the scrollHeight
    inputElement.style.height = inputElement.scrollHeight + 'px';
  }  
}


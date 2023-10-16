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
    console.log(this.id, this.messages);

   

    })
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


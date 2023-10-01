import { Injectable } from '@angular/core';
import { Message } from '../interface/message';
import { Conversation, UserData } from '../interface/conversation';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  responseData: UserData | null = null; // Use the UserData interface
  constructor(private http: HttpClient) {}
  conversations: Conversation[] = [
    {
    id: '1',
    name: 'John',
    messages: [
        {"role":"user", "content": "Hey"},
        {"role":"system", "content": "Hey i'm Mizan AI how can i help you today?"},
        {"role":"user", "content": "what are you used for?"},
        {"role":"system", "content": "My main Role is to predict How wins the Legal Case to Help judges Decide the last decision"}
    ]
    },
    {
      id: '2',
      name: 'Mohammed',
      messages: [
          {"role":"user", "content": "hi"},
          {"role":"system", "content": "hi i'm Mizan AI how can i help you today?"},
          {"role":"user", "content": "who use you?"},
          {"role":"system", "content": "Judges, Lawyers, And more"}
      ]
      },
  ]
  getConversations() {
    return this.conversations;
  }
  getConversation(id:string) {
    return this.conversations.find(conversation => conversation.id === id);
  }
  addMessage(id:string, message:Message){
    this.conversations.filter(conversation => conversation.id === id)[0].messages.push(message)
  }
  createConversation(message:Message) {
    let id = (this.conversations.length + 1).toString()
    this.conversations.push({id, name: message.content, messages: [message]})
    return id;
  }
  deleteConversation(conversationId: string) {
    this.conversations = this.conversations.filter(conversation => conversation.id !== conversationId);
  }

UserisAuth(): Observable<boolean> {
  return this.http.get<UserData>('http://localhost:8000/api/user', { withCredentials: true }).pipe(
    map((res: UserData) => {
      this.responseData = res;
      return true;
    }),
    catchError(err => {
      console.log(err);
      return of(false); // Return an Observable of false in case of an error
    })
  );
}


userData(): Observable<UserData> {
  return this.http.get<UserData>('http://localhost:8000/api/user', { withCredentials: true }).pipe(
    map((res: UserData) => {
      this.responseData = res;
      return res; // Return the received user data
    }),
    catchError(err => {
      console.log(err);
      throw err; // Re-throw the error to be handled by the caller
    })
  );
}

logout() {
  this.http.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
  .subscribe(() => {
  });
  }






  
}

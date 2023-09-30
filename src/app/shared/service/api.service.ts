import { Injectable } from '@angular/core';
import { Message } from '../interface/message';
import { Conversation } from '../interface/conversation';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

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

  constructor() { }

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
  
}

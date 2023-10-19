import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Conversation } from './shared/interface/conversation';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private conversations = new BehaviorSubject<Conversation[]>([]);

  getConversations(): Observable<Conversation[]> {
    return this.conversations.asObservable();
  }

  updateConversations(updatedConversations: Conversation[]): void {
    this.conversations.next(updatedConversations);
  }
}



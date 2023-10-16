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
  conversations: Conversation[] | null = null
  getConversations(): Observable<Conversation[]> {
    console.log('Called: GetConversations');
    return this.http.get<Conversation[]>('http://localhost:8000/api/get_conversations', { withCredentials: true }).pipe(
      map((res: Conversation[]) => {
        this.conversations = res;
        return res;
      }),
      catchError((error: any) => {
        // Handle the error appropriately
        console.error('An error occurred:', error);
        throw error; // Rethrow it back to keep the observable in an error state
      })
    );
  }
  getConversation(id: string): Observable<Conversation> {
    return this.http.get<Conversation>(`http://localhost:8000/api/get_conversation/${id}`, { withCredentials: true });
  }
  
  addMessage(message:Message, ConversationId:string) {
    const body = {
      content: message.content // Replace message.content with your actual message content
    };
    return this.http.post(`http://localhost:8000/api/send_message/${ConversationId}/`, body);
  }
  
//  createConversation(message:Message) {
  //  let id = (this.conversations.length + 1).toString()
    //this.conversations.push({id, name: message.content, messages: [message]})
    //return id;
  //}

  deleteConversation(conversationId: number): Observable<any> {
    console.log("function Delete Being Called ");
    return this.http.delete(`http://localhost:8000/api/delete_conversation/${conversationId}/`, { withCredentials: true });
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

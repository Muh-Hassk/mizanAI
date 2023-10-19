export interface Message {
    id:number;
    role: string;
    content: string;
    timestamp?: number;
}

export interface Conversation {
    id: number;
    name: string;
    user:number;
    messages: Message[];
}

export interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    accountType: string;
  }
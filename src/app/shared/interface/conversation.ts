import { Message } from "./message";

export interface Conversation {
    id:string,
    name:string,
    messages: Message[],
}
export interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    accountType: string;
  }
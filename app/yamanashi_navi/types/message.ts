export interface Message {
  role: "user" | "ai";
  content: string;
  time_stamp: string;
}

export interface ChatState {
  messages: Message[];
  username: string;
  isInputActive: boolean;
}
export interface PrivateMessage {
  toUser: string;
  fromUser: string;
  message: string;
  isSeen: boolean;
  sentAt: string;
}

export interface MessageUser {
  id: string;
  name: string;
  image: string;
  last_message: string;
  last_message_sent_at: string;
  message_amount: number;
}

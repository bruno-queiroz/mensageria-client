export interface PrivateMessage {
  toUser: string;
  fromUser: string;
  message: string;
  isSeen: boolean;
  sentAt: Date;
}

export interface MessageUser {
  id: string;
  name: string;
  image: string;
}

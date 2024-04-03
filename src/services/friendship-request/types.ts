export interface FriendshipRequest {
  toUser: string;
  fromUser: string;
  isAccept: boolean;
  sentAt: Date;
}

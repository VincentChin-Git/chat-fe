import IContact from './contact';

export interface IChatOverview {
  contactData: IChat;
  msgData: IContact;
}

export interface IChatUnread {
  contactId: string;
  unread: number;
}

export default interface IChat {
  _id: string;
  senderId: string;
  receiveId: string;
  content: string;
  contentType: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

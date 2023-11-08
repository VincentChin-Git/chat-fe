export default interface IContact {
  _id: string;
  userId: string;
  contactId: string;
  relativePoint: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContactPopulate {
  _id?: string;
  mobile?: string;
  nickname?: string;
  avatar?: string;
  describe?: string;
  lastActive?: Date;
}

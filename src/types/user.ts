export default interface IUser {
  [index: string]: string | Date | undefined;
  _id?: string;
  username?: string;
  mobile?: string;
  password?: any;
  nickname?: string;
  avatar?: string;
  describe?: string;
  status?: string;
  lastActive?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

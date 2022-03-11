import {User} from "./user.model";

export interface Listing {
  id?: number;
  title: string;
  desc?: string;
  owner?: User;
  type?: string;
  category?: string;
  candidates?: User[];
  likedBy?: User[];
}

import {User} from "./user.model";

export interface Listing {
  id?: number;
  title: string;
  desc?: string;
  owner?: User;
  ownerID? : number;
  type?: string;
  category?: string;
  candidates?: User[];
  likedBy: number[];
}

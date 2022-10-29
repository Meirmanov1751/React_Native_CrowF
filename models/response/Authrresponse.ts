import {IUser} from "../IUser";

export interface Authresponse{
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

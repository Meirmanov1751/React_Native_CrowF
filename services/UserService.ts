import instance from "../api/api";
import {AxiosResponse} from "axios";
import {Authresponse} from "../models/response/Authrresponse";
import {IUser} from "../models/IUser";

export default class UserService{
  static async FetchUser(): Promise<AxiosResponse<IUser[]>>{
    return instance.get<IUser[]>('users')
  }

}

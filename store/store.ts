import { makeAutoObservable } from "mobx";
import {IUser} from "../models/IUser";
import AuthService from "../service/AuthService";
import axios from "axios";
import {Authresponse} from "../models/response/Authrresponse";
import {BASE_URL} from "../api/api";

export default class Store{
  user = {} as IUser;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }
  setAuth(bool: boolean){
    this.isAuth = bool;
  }

  setUser(user: IUser){
    this.user = user;
  }

  async login(username: string, password: string){
    try{
      const response: any = await AuthService.login(username, password);
      console.log(response.data['auth_token'])
      localStorage.setItem('token', response.data['auth_token']);
      this.setAuth(true)
      this.setUser(response.data.user)
    }catch(e: any){
      console.log(e.response?.data?.message)
    }
  }

  async registration(username: string, password: string){
    try{
      const response: any = await AuthService.registration(username, password);
      localStorage.setItem('token', response.data['auth_token']);
      this.setAuth(true)
      this.setUser(response.data.user)
    }catch(e: any){
      console.log(e.response?.data?.message)
    }
  }

  async logout(username: string, password: string){
    try{
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false)
      this.setUser({} as IUser)
    }catch(e: any){
      console.log(e.response?.data?.message)
    }
  }

  async checkAuth(){
    try {
      const response: any = await axios.get<Authresponse>(`${BASE_URL}auth/jwt/refresh`, {withCredentials: true})
      localStorage.setItem('token', response.data['auth_token']);
      this.setAuth(true)
      this.setUser(response.data.user)
    }catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }
}

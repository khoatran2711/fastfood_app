import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  removeUser() {
    localStorage.removeItem('user');
  }
  isLogged() {
    return !!localStorage.getItem('user');
  }
}

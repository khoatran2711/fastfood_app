import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADMIN_URL } from 'src/app/common/api.common';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  login(data: any) {
    return this.httpClient.post(ADMIN_URL.login, data);
  }
  register(data: any) {
    return this.httpClient.post(ADMIN_URL.register, data);
  }
  listCategory() {
    return this.httpClient.get(ADMIN_URL.allCategory);
  }
  listFood() {
    return this.httpClient.get(ADMIN_URL.allFood);
  }
  getFood(id: string) {
    return this.httpClient.get(ADMIN_URL.getFood + '?id=' + id);
  }


  createOrder(data: any) {
    return this.httpClient.post(ADMIN_URL.createOrder, data);
  }
  orderHistory() {
    const user = this.userService.getUser();
    const id = user.id;
    return this.httpClient.get(ADMIN_URL.historyOrder, { params: { userId: id } });
  }
}

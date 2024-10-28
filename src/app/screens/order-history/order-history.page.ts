import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {

  orders: any[] = [];
  statusData = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Pending: 'Đang chờ',
    success: 'Hoàn thành',
    canceled: 'Đã Hủy',
  };
  constructor(private apiSerivce: ApiService) { }

  ionViewWillEnter() {
    this.getOrders();

  }
  ngOnInit() {
    this.getOrders();
  }

  // Mock data, replace with your API call

  getOrders() {
    this.apiSerivce.orderHistory().subscribe((response: any) => {
     response.data.forEach((order) => {
       order.created_at = moment.unix(order.created_at).format('DD-MM-YYYY | HH:mm');
     });
     this.orders = response.data;
     this.orders = this.orders.reverse();
    });
  }
  viewOrderDetails(order) {
    console.log('Order details:', order);
  }
  getImageUrl(image: string) {
    if (image?.includes('http')) {
      return image;
    }
    return environment.host + image;
  }
}

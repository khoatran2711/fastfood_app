import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item.model';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems$: Observable<CartItem[]>;
  totalAmount$: Observable<number>;

  constructor(
    private cartService: CartService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private apiService: ApiService,
    private userService: UserService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}
  // ionViewWillEnter() {
  //   this.cartItems$ = this.cartService.getCart();
  //   this.totalAmount$ = this.cartService.getTotalAmount();
  // }

  ngOnInit() {
    this.cartItems$ = this.cartService.getCart();
    this.totalAmount$ = this.cartService.getTotalAmount();
  }

  onIncrease(item: CartItem) {
    this.cartService.changeQty(1, item.id);
  }

  onDecrease(item: CartItem) {
    if (item.quantity === 1) {
      this.removeFromCart(item);
    } else {
      this.cartService.changeQty(-1, item.id);
    }
  }

  async removeFromCart(item: CartItem) {
    const alert = await this.alertCtrl.create({
      header: 'Remove',
      message: 'Are you sure you want to remove?',
      buttons: [
        {
          text: 'Yes',
          handler: () => this.cartService.removeItem(item.id),
        },
        {
          text: 'No',
        },
      ],
    });

    alert.present();
  }
  // async showLoading() {

  // }

  getImageUrl(image: string) {
    if (image?.includes('http')) {
      return image;
    }
    return environment.host + image;
  }
  async payment() {
    // this.apiService.
    const loading = await this.loadingCtrl.create({
      message: 'Vui lòng chờ...',
      duration: 1500,
    });
    const user = this.userService.getUser();
    if(!user){
      const toast = await this.toastCtrl.create({
        message: 'Hãy đăng nhập để sử dụng chức năng này !',
        mode: 'ios',
        duration: 1000,
        position: 'top',
      });
      toast.present();

      this.userService.removeUser();
      this.router.navigate(['login']);
    }
    let products: CartItem[] = [];
    this.cartItems$.subscribe(items => products = items);

    let totalPrice = 0;
    this.totalAmount$.subscribe(amount => totalPrice = amount);

    const data = {
      products,
      totalPrice,
      address: user.address,
      userId: user.id,
    };
    loading.present();
    this.apiService.createOrder(data).subscribe( async (res) => {
      const toast = await this.toastCtrl.create({
        message: 'Thêm đơn hàng thành công',
        mode: 'ios',
        duration: 1000,
        position: 'top',
      });
    this.cartService.clearCart();
    loading.dismiss();
    toast.present();
    });

  }
}

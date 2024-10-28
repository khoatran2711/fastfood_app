import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CartItem } from 'src/app/models/cart-item.model';
import { Food } from 'src/app/models/food.model';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  id: string | null;
  food: Food;

  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private toastCtrl: ToastController,
    private apiService: ApiService,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') ;
  }

  ngOnInit() {
    this.getFood();
    // this.food = this.foodService.getFood(this.id );
  }

  addItemToCart() {
    const cartitem: CartItem = {
      id: this.food.id,
      name: this.food.name,
      price: this.food.price,
      thumbnail: this.food?.thumbnail,
      quantity: 1,
    };

    this.cartService.addToCart(cartitem);
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Thêm vào giỏ hàng thành công',
      mode: 'ios',
      duration: 1000,
      position: 'top',
    });

    toast.present();
  }
  getFood() {
    return this.apiService.getFood(this.id).subscribe((res: any) => {
      console.log(res.data);
      this.food = res.data;
    });
  }
  getImageUrl(image: string) {
    if (image?.includes('http')) {
      return image;
    }
    return environment.host + image;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items$ = new BehaviorSubject<CartItem[]>([
    // {
    //   id: 1,
    //   name: 'Sea Food',
    //   price: 12,
    //   image: 'assets/images/foods/seafood-dishes.png',
    //   quantity: 1,
    // },
  ]);

  getCart() {
    return this.items$.asObservable();
  }

  addToCart(newItem: CartItem) {
    if (this.items$.getValue().find((item) => item.id === newItem.id)) {
      this.changeQty(1, newItem.id);
      return;
    }
    this.items$.next([...this.items$.getValue(), newItem]);
    return;
  }

  removeItem(id: number) {
    this.items$.next(this.items$.getValue().filter((item) => item.id !== id));
  }

  changeQty(quantity: number, id: number) {
    const items = this.items$.getValue();
    const index = items.findIndex((item) => item.id === id);
    items[index].quantity += quantity;
    this.items$.next(items);
  }

  getTotalAmount() {
    return this.items$.pipe(
      map((items) => {
        let total = 0;
        items.forEach((item) => {
          total += item.quantity * item.price;
        });

        return total;
      })
    );
  }
  clearCart() {
    this.items$.next([]);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Food } from 'src/app/models/food.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
})
export class FoodCardComponent {
  @Input() item: Food;

  @Output() clicked = new EventEmitter();
  getImageUrl(image: string) {
    if (image.includes('http')) {
      return image;
    }
    return environment.host + image;
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent {
  @Input() item: Category;
  @Output() clicked = new EventEmitter();
  getImage(image: string) {
    if (image.includes('http') || image.includes('assets')) {
      return image;

    }
    return environment.host + image;
  }
}

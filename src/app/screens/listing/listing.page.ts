import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Food } from 'src/app/models/food.model';
import { ApiService } from 'src/app/services/api.service';
// import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  categories: Category[] = [];
  foods: Food[] = [];
  defaulatCate = {
    id: 1,
    name: 'All',
    thumbnail: 'assets/images/icons/all.png',
    active: true,
  };
  constructor(
    // private foodService: FoodService,
    private router: Router,
    private apiService: ApiService
  ) {}
  ionViewWillEnter() {
    this.getCategories();
    this.getFoods();
  }
  ngOnInit() {
    this.getCategories();
    this.getFoods();
    // this.foods = this.foodService.getFoods();
  }

  getCategories() {
    this.apiService.listCategory().subscribe((res: any) => {
      console.log(res.data);
      this.categories = res.data;
    });

  }

  getFoods(){
    this.apiService.listFood().subscribe((res: any) => {
      console.log(res.data);
      this.foods = res.data;
    });
  }
  goToDetailPage(id: number) {
    this.router.navigate(['detail', id]);
  }
}

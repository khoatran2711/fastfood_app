import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  id: string;
  categoryData: any;
  foodData = [];
  constructor(private activatedRoute: ActivatedRoute,private apiService: ApiService,private router: Router) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }
  ngOnInit() {
   this.fetchCategory();
   this.fetchListFood();
  }
  fetchCategory() {
    this.apiService.getCategory(this.id).subscribe((res: any) => {
      this.categoryData = res.data;
    });
  }
  fetchListFood() {
    this.apiService.listFood().subscribe((res: any) => {
      this.foodData = res.data;
      this.foodData = this.foodData.filter((item) => item.categoryID === this.id);
    });
  }
  getImage(image: string) {
    if (image.includes('http') || image.includes('assets')) {
      return image;
    }
    return environment.host + image;
  }
  goToDetailPage(id: number) {
    this.router.navigate(['detail', id]);
  }
}

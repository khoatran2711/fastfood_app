import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchQuery = '';
  items: Array<{ name: string; thumbnail: string; price: string; description: string }> = [];
  filteredItems: Array<{ name: string; thumbnail: string; price: string; description: string }> = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadItems();
  }

  // Mock data, replace this with your API call or database retrieval logic
  loadItems() {
    this.apiService.listFood().subscribe((res: any) => {
      this.items = res.data;
      this.filteredItems = [...this.items]; // Initially
    });
  }

  // Filter the items based on the search query
  filterItems(event) {
    const query = event.target.value.toLowerCase();

    if (query && query.trim() !== '') {
      this.filteredItems = this.items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    } else {
      this.filteredItems = [...this.items]; // Show all items if the search query is empty
    }
  }
  getImage(image: string) {
    if (image.includes('http') || image.includes('assets')) {
      return image;

    }
    return environment.host + image;
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'listing',
        loadChildren: () =>
          import('../screens/listing/listing.module').then(
            (m) => m.ListingPageModule
          ),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('../screens/cart/cart.module').then((m) => m.CartPageModule),
      },
      {
        path: 'order-history',
        loadChildren: () =>
          import('../screens/order-history/order-history.module').then(
            (m) => m.OrderHistoryPageModule
          ),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('../screens/search/search.module').then(
            (m) => m.SearchPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'listing',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}

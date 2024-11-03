import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'detail/:id',
    loadChildren: () =>
      import('./screens/detail/detail.module').then((m) => m.DetailPageModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then( m => m.AuthenticationPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./screens/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./screens/register/register.module').then( m => m.RegisterPageModule)
  },

  {
    path: 'order-history',
    loadChildren: () => import('./screens/order-history/order-history.module').then( m => m.OrderHistoryPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./screens/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'category/:id',
    loadChildren: () => import('./screens/category/category.module').then( m => m.CategoryPageModule)
  },  {
    path: 'edit-profile',
    loadChildren: () => import('./screens/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

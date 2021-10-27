import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {DetailsComponent} from './core/details/details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'details', component: DetailsComponent},
  // {path: 'server-error', component: ServerErrorComponent},
  // {path: 'not-found', component: NotFoundComponent},
  // {path: 'shop', loadChildren: () => import('./shop/shop.module').then((mod) => mod.ShopModule)},
  // {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

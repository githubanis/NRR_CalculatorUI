import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import { DetailsComponent } from './details/details.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    NavBarComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavBarComponent]
})
export class CoreModule { }

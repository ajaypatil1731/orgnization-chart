import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridViewRoutingModule } from './grid-view-routing.module';
import { GridViewComponent } from './grid-view.component';
import { ClrDatagridModule } from '@clr/angular';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    GridViewComponent
  ],
  imports: [
    CommonModule,
    GridViewRoutingModule,
    ClrDatagridModule,
    SharedModule
  ]
})
export class GridViewModule { }

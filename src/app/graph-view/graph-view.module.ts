import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphViewRoutingModule } from './graph-view-routing.module';
import { GraphViewComponent } from './graph-view.component';
import { SharedModule } from '../shared/shared.module';
import { ClarityIcons, cogIcon, userIcon } from '@cds/core/icon';

@NgModule({
  declarations: [
    GraphViewComponent
  ],
  imports: [
    CommonModule,
    GraphViewRoutingModule,
    SharedModule
  ]
})
export class GraphViewModule { 
  constructor() {
    ClarityIcons.addIcons(userIcon, cogIcon);
  }
}

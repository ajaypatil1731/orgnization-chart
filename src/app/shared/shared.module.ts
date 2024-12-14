import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { ClarityModule, ClrFormsModule, ClrInputModule, ClrModalModule } from '@clr/angular';
import { banIcon, ClarityIcons, ellipsisVerticalIcon, pencilIcon, plusIcon, twoWayArrowsIcon } from '@cds/core/icon';
import { CdsModule } from '@cds/angular';
import { FormsModule } from '@angular/forms';
import { AddReporteeComponent } from './components/add-reportee/add-reportee.component';

@NgModule({
  declarations: [
    ContextMenuComponent,
    AddReporteeComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ClrFormsModule,
    ClarityModule,
    CdsModule,
    ClrModalModule,
    ClrInputModule
  ],
  exports: [ContextMenuComponent]
})
export class SharedModule {
  constructor() {
    ClarityIcons.addIcons(ellipsisVerticalIcon, plusIcon, pencilIcon, banIcon, twoWayArrowsIcon);
  }
}

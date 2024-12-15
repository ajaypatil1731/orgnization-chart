import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { ClarityModule, ClrCommonFormsModule, ClrFormsModule, ClrInputModule, ClrModal, ClrModalModule, ClrSelectModule } from '@clr/angular';
import { banIcon, ClarityIcons, ellipsisVerticalIcon, pencilIcon, plusIcon, twoWayArrowsIcon } from '@cds/core/icon';
import { CdsModule } from '@cds/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AddReporteeComponent } from './components/add-reportee/add-reportee.component';
import { DeleteReporteeComponent } from './components/delete-reportee/delete-reportee.component';
import { ChangeReporteeLineManagerComponent } from './components/change-reportee-line-manager/change-reportee-line-manager.component';

@NgModule({
  declarations: [
    ContextMenuComponent,
    AddReporteeComponent,
    DeleteReporteeComponent,
    ChangeReporteeLineManagerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClrFormsModule,
    ClarityModule,
    CdsModule,
    ClrModalModule
  ],
  exports: [ContextMenuComponent]
})
export class SharedModule {
  constructor() {
    ClarityIcons.addIcons(ellipsisVerticalIcon, plusIcon, pencilIcon, banIcon, twoWayArrowsIcon);
  }
}

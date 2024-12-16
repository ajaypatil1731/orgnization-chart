import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'graph-view',  
    pathMatch: 'full'
  }, {
    path: 'graph-view',
    loadChildren: () => import('./graph-view/graph-view.module').then(m => m.GraphViewModule)
  }, {
    path: 'grid-view',
    loadChildren: () => import('./grid-view/grid-view.module').then(m => m.GridViewModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]                  
})
export class AppRoutingModule { }

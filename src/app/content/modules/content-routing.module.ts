import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../components/home/modules/home.module').then(m => m.HomeModule)
  },
  {
    path: 'legal',
    loadChildren: () => import('../components/legal/modules/legal.module').then(m => m.LegalModule)
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }

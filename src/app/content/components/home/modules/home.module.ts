import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from '../components/home/home.component';
import { HowItWorksComponent } from '../components/how-it-works/how-it-works.component';

@NgModule({
  declarations: [
    HomeComponent,
    HowItWorksComponent,
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }

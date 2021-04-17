import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from '../components/home/home.component';
import { HowItWorksComponent } from '../components/how-it-works/how-it-works.component';
import { AboutComponent } from '../components/about/about.component';

@NgModule({
  declarations: [
    HomeComponent,
    HowItWorksComponent,
    AboutComponent,
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PageHeroComponent } from './components/page-hero/page-hero.component';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    PageHeroComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    PageHeroComponent
  ]
})
export class SharedModule { }

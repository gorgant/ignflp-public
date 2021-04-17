import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PageHeroComponent } from './components/page-hero/page-hero.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AvatarPortraitComponent } from './components/avatar-portrait/avatar-portrait.component';



@NgModule({
  declarations: [
    PageHeroComponent,
    AvatarPortraitComponent
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
    PageHeroComponent,
    AvatarPortraitComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PageHeroComponent } from './components/page-hero/page-hero.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AvatarPortraitComponent } from './components/avatar-portrait/avatar-portrait.component';
import { GetStartedComponent } from './components/get-started/get-started.component';



@NgModule({
  declarations: [
    PageHeroComponent,
    AvatarPortraitComponent,
    GetStartedComponent
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
    AvatarPortraitComponent,
    GetStartedComponent
  ]
})
export class SharedModule { }

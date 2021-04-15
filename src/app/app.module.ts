import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavigationModule } from './navigation/modules/navigation.module';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule.withConfig({ssrObserveBreakpoints: ['gt-sm', 'gt-md', 'lt-md']}),
    NavigationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

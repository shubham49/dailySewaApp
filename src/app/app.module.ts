import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GaugeModule } from 'angular-gauge';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ImagePreloaderDirective } from './image-preloader.directive';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ImagePreloaderDirective,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GaugeModule.forRoot(),
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

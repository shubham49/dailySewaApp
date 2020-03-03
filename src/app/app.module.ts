import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './list/list.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './services/data.service';
import { ExcelService } from './services/excel.service';
import { AppUtilsService } from './services/app-utils.service';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [DataService, ExcelService, AppUtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

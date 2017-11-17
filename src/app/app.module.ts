import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { HomeComponent } from './home/home.component';

import { HomeService } from './services/home.service'; 
import { GnomeProfessionHelper } from 'app/helpers/gnomeProfessions.helper';
import { StorageApp } from 'app/helpers/storage.helper';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [HomeService, GnomeProfessionHelper, StorageApp],
  bootstrap: [AppComponent]
})
export class AppModule { }

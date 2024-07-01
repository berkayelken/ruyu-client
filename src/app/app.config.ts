import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from "@angular/platform-browser/animations";

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { backendRequestInterceptor } from './backend-request.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HomeComponent } from './home/home.component'; // Import other components as needed
import { DragDropModule } from '@angular/cdk/drag-drop';


import { bootstrapApplication } from '@angular/platform-browser';







export class AppConfig { }

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([backendRequestInterceptor])), provideAnimations(), provideAnimationsAsync(), DragDropModule]
};

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
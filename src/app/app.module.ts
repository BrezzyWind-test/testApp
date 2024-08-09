import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './pages/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared-module/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { UsersModule } from './pages/users/users.module';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRoute } from './customRoute';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    UsersModule,
    MatTableModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: CustomRoute }],
  bootstrap: [AppComponent],
})
export class AppModule {}

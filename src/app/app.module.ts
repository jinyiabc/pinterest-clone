import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';    // http


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { routingComponents, AppRoutingModule } from './app-routing.module';
import { MyInterestService } from './my-interest.service';
import { MasonComponent } from './mason/mason.component';
import { NgxMasonryModule } from './ngx-masonry/ngx-masonry.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { LoginComponent } from './login/login.component';
import { AlertService } from './alert/alert.service';
import { GlobalEventsManager } from './GlobalEventsManager';
import { AuthGuard } from './auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingComponents,
    LoginComponent,
    MasonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,    // http
    NgxMasonryModule,
    LoginRoutingModule,
    AppRoutingModule
  ],
  providers: [MyInterestService,AlertService, GlobalEventsManager, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

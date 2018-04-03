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


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingComponents,
    MasonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,    // http
    NgxMasonryModule,
    AppRoutingModule
  ],
  providers: [MyInterestService],
  bootstrap: [AppComponent]
})
export class AppModule { }

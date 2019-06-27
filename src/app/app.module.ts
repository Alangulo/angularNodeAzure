import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { MsAdalAngular6Module, AuthenticationGuard } from 'microsoft-adal-angular6';
import { AdalService } from './app/adal.service';
import { ConfigService } from './app/config-adal.service';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    // MsAdalAngular6Module.forRoot({
    //   "clientId": "7232d3eb-6d17-489d-bf02-259f30d71dd0",
    //   "tenant": "ff882bc2-9a86-4418-beb2-a65db40835d8",
    //   redirectUri: window.location.origin + '/',
    //   postLogoutRedirectUri: window.location.origin + '/',
    //   endpoint: {
    //     "https://localhost:3300/": "xxx-bae6-4760-b434-xxx"
    //   },
    //   navigateToLoginRequestUrl: false,
    //   cacheLocation: 'sessionStorage',
    // }),
    MsAdalAngular6Module.forRoot(environment),
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: false })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthenticationGuard, AdalService, ConfigService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdalService, 
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}

import { NgModule } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { ConfigService } from './config-adal.service';
import { Injectable } from '@angular/core';

 
// import 'expose-loader?AuthenticationContext!../../../node_modules/adal-angular/lib/adal.js';
 
let createAuthContextFn: adal.AuthenticationContextStatic; // = AuthenticationContext;
 
@Injectable()
 
export class AdalService implements HttpInterceptor {
 
    private context: adal.AuthenticationContext;

    constructor(private adalSvc: MsAdalAngular6Service) {
        this.adalSvc.acquireToken('<RESOURCE>').subscribe((resToken: string) => {
          console.log(resToken);
        });
    }
    
    // constructor(private configService: ConfigService) {
    //     this.context = new createAuthContextFn(configService.getAdalConfig);
    // }
    
    login() {
        this.adalSvc.login();
    }
    
    logout() {
        this.adalSvc.logout();
    }
    
    handleCallback() {
        this.context.handleWindowCallback();
    }
    
    public get isAuthenticated() {
        return this.adalSvc.userInfo && this.adalSvc.accessToken;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // retrieve resource from endpoints configuration
        const resource = this.adalSvc.GetResourceForEndpoint(request.url);
        if (!resource) {
            return next.handle(request);
        }
        if (!this.adalSvc.isAuthenticated) {
            throw new Error('Cannot send request to registered endpoint if the user is not authenticated.');
        }

        // acquire and inject token
        return this.adalSvc.acquireToken(resource)
            .pipe(
                mergeMap((token: string) => {
                    // clone the request and replace the original headers with
                    // cloned headers, updated with the authorization
                    const authorizedRequest = request.clone({
                        headers: request.headers.set('Authorization', 'Bearer ' + token),
                    });
                    return next.handle(authorizedRequest);
                }
                )
            );
    }
 
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
 
@Injectable()
 
export class ConfigService {

  private ADALcontext: adal.AuthenticationContext;
  private ADALconfig = environment;
 
  constructor() {}
  
  public get getAdalConfig(): any {
    return this.ADALconfig;
  }
 
}
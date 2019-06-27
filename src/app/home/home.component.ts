import {Component} from '@angular/core';
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard } from 'microsoft-adal-angular6';
// import { ADALEnvironment } from '../../environments/environment';
// import { ConfigService } from '../app/config-adal.service'




@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})


export class HomeComponent {

  public currentUser: any;
  public currentInfo: any;
  public sessionToken: string;

  constructor(private adalSvc: MsAdalAngular6Service) {
    this.currentUser = this.adalSvc.userInfo;
    this.currentInfo = this.currentUser.profile;

    // var token = this.adalSvc.acquireToken('http://adal.resource.com')
    //   .subscribe((token: string) => {
    //     console.log(token);
    //     this.sessionToken = token;
        
    //   });

      var token = this.adalSvc.acquireToken('https://login.microsoftonline.com')
      .subscribe((token: string) => {
        // console.log(token);
        this.sessionToken = token;
        
      });
  }

  ngOnInit() {
    
  }


}
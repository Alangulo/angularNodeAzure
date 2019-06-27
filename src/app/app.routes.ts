import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthenticationGuard } from 'microsoft-adal-angular6';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthenticationGuard]  },
  // { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
  // { path: '', component: HomeComponent}
  
];

@NgModule({
  imports: [    
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
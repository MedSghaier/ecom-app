import { SharedModule } from 'shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BstrapNavbarComponent } from './components/bstrap-navbar/bstrap-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([]),
  ],
  declarations: [
    BstrapNavbarComponent,
    HomeComponent,
    LoginComponent,
  ],
  exports: [
    BstrapNavbarComponent
  ]
})
export class CoreModule { }

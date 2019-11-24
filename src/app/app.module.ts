// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

// components
import { AppComponent } from './app.component';

import { SignUpComponent } from './sign-up/sign-up.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
//routes
import { appRoutes } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserService } from './shared/user.service';
import { CustomerService } from './shared/customer.service';
import {EditServiceService} from './shared/edit-service.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { PopcreateproductsComponent } from './pop/popcreateproducts/popcreateproducts.component';
import { PopassignproductsComponent } from './pop/popassignproducts/popassignproducts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { ModalModule } from 'ngx-bootstrap/modal';
import {MatListModule} from '@angular/material/list';
import { SignuppopupComponent } from './pop/signuppopup/signuppopup.component';
import { TilesComponent } from './tiles/tiles.component';


@NgModule({
  declarations: [
    AppComponent,
    
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    CreateproductComponent,
    NavbarComponent,
    CreateuserComponent,
    
    ProductlistComponent,
    PopcreateproductsComponent,
    PopassignproductsComponent,
    
    SignuppopupComponent,
    
    TilesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    ModalModule.forRoot(),
    MatListModule
   
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService,CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

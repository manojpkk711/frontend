import { SignuppopupComponent } from './pop/signuppopup/signuppopup.component';
import { Routes } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { CreateproductComponent } from './createproduct/createproduct.component';

import { CreateuserComponent } from './createuser/createuser.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { PopcreateproductsComponent } from './pop/popcreateproducts/popcreateproducts.component';
import { PopassignproductsComponent } from './pop/popassignproducts/popassignproducts.component';
import { TilesComponent } from './tiles/tiles.component';

export const appRoutes: Routes = [
    {
        path: 'signup', component: SignUpComponent
        
    },
    {
        path: 'login', component:  SignInComponent,
       
    },
    {
        path: 'createproduct', component: CreateproductComponent,canActivate:[AuthGuard]
    },
    {
        path: 'productlist', component: ProductlistComponent,canActivate:[AuthGuard]
    },
    {
        path: 'popcreateproducts', component: PopcreateproductsComponent,canActivate:[AuthGuard]
    },
    {
        path: 'popassignproducts', component: PopassignproductsComponent,canActivate:[AuthGuard]
    },
    {
        path: 'tiles', component: TilesComponent,canActivate:[AuthGuard]
    },
    {
        path: 'signuppopup', component: SignuppopupComponent,canActivate:[AuthGuard]
    },
   
    {
        path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
    },
    {
        path: 'createuser', component: CreateuserComponent,canActivate:[AuthGuard]
    },
    {
        path: '', redirectTo: '/signup', pathMatch: 'full'
    }
];
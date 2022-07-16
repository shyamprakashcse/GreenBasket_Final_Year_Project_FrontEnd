import { ProfileComponent } from './profile/profile.component';
import { ViewproductsComponent } from './viewproducts/viewproducts.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../auth/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { ExploreComponent } from './explore/explore.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { QuoraComponent } from './quora/quora.component';
import { BusinessportalComponent } from './businessportal/businessportal.component';
import { VendorsComponent } from './vendors/vendors.component';
import { CreatecompanyComponent } from './createcompany/createcompany.component';
import { MaterialmanagementComponent } from './materialmanagement/materialmanagement.component';
import { ProductmanagementComponent } from './productmanagement/productmanagement.component';

const routes: Routes = [{path:'home',component:HomeComponent,canActivate:[AuthGuard],
children:[
  {path:'homepage',component:HomepageComponent,canActivate:[AuthGuard],pathMatch:"full"},
   {path:'explore',component:ExploreComponent,canActivate:[AuthGuard],pathMatch:"full"},
   {path:'sell',component:AddProductsComponent,canActivate:[AuthGuard],pathMatch:"full"},
   {path:'view',component:ViewproductsComponent,canActivate:[AuthGuard],pathMatch:"full"},
   {path:'profile',component:ProfileComponent,canActivate:[AuthGuard],pathMatch:"full"},
   {path:'ask',component:QuoraComponent,canActivate:[AuthGuard],pathMatch:"full"},
   {path:'business',component:BusinessportalComponent,canActivate:[AuthGuard],pathMatch:"full"},
   {path:'vendors',component:VendorsComponent,canActivate:[AuthGuard],pathMatch:"full"},
   {path:'indcrt',component:CreatecompanyComponent,canActivate:[AuthGuard],pathMatch:"full"}, 
   {path:'myind/:id',component:MaterialmanagementComponent,canActivate:[AuthGuard],pathMatch:"full"},
   {path:'prodcrud',component:ProductmanagementComponent,canActivate:[AuthGuard],pathMatch:"full"}

]}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

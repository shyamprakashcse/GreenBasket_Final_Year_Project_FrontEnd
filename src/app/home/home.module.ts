import { HomeService } from './home.service';
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { ExploreComponent } from './explore/explore.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { AddProductsComponent } from './add-products/add-products.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewproductsComponent } from './viewproducts/viewproducts.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './profile/profile.component';
import { QuoraComponent } from './quora/quora.component';
import { BusinessportalComponent } from './businessportal/businessportal.component';
import { VendorsComponent } from './vendors/vendors.component';
import { CreatecompanyComponent } from './createcompany/createcompany.component';
import { MaterialmanagementComponent } from './materialmanagement/materialmanagement.component';
import { ProductmanagementComponent } from './productmanagement/productmanagement.component';
import { OrderModule } from 'ngx-order-pipe'; 
import {FilterPipeModule} from 'ngx-filter-pipe'

@NgModule({
  declarations: [
    HomepageComponent,
    ExploreComponent,
    HomeComponent,
    AddProductsComponent,
    ViewproductsComponent,
    ProfileComponent,
    QuoraComponent,
    BusinessportalComponent,
    VendorsComponent,
    CreatecompanyComponent,
    MaterialmanagementComponent,
    ProductmanagementComponent,
    
   



  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    OrderModule,
    FilterPipeModule


  ],
  exports:[
    HomepageComponent,
    ExploreComponent,
    HomeComponent,
    QuoraComponent,
    FormsModule,



  ],
  providers:[HomeService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }

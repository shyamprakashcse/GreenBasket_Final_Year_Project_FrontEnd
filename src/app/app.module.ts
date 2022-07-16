import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore'
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';
import { ResponsecontrollerGuard } from './auth/responsecontroller.guard';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { TokenInterceptorService } from './auth/token-interceptor.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeRoutingModule } from './home/home-routing.module';
import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import {FilterPipeModule} from 'ngx-filter-pipe'

@NgModule({
  declarations: [
    AppComponent,
    
    




  ],
  imports: [
    BrowserModule,
    FormsModule,
    HomeRoutingModule,
    AppRoutingModule,
    AuthModule,
    HomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    NgxSpinnerModule,
    BrowserModule,
    BrowserAnimationsModule,
    OrderModule,
    FilterPipeModule
    
    





  ],
  providers: [AuthService,ResponsecontrollerGuard,AuthGuard,TokenInterceptorService],
  exports:[FormsModule],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

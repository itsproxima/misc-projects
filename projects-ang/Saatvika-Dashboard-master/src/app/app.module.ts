import { NgModule, ErrorHandler } from '@angular/core';
import { HashLocationStrategy, LocationStrategy,Location } from '@angular/common';
import { FormsModule,FormGroup,FormControlName,ControlContainer,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, ROUTES } from '@angular/router';
import { SweetAlertService } from 'angular-sweetalert-service';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TransportManager } from './services/TransportManager';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReportComponent } from './components/report/report.component';
import { AssignComponent } from './components/assign/assign.component';
import { MyDatePickerModule } from 'mydatepicker';
import {NgxPaginationModule} from 'ngx-pagination';
import { XHRBackend } from '@angular/http';
import { BulkComponent } from '../app/components/bulkUpload/bulkUpload.component';
import { PapaParseModule } from 'ngx-papaparse';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDashboardComponent,
    OrderHistoryComponent,
    OrderDetailsComponent,
    HeaderComponent,
    UpdateProductComponent,
    AssignComponent,BulkComponent,
    ReportComponent],
  imports: [
    PapaParseModule,BrowserModule,MyDatePickerModule,NgxPaginationModule, ReactiveFormsModule, BrowserAnimationsModule, FormsModule, HttpModule, RouterModule,routing,InfiniteScrollModule,
      NgbModule.forRoot(),
      ToastrModule.forRoot(),
      ToastModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot()
  ],

  providers: [TransportManager,SweetAlertService,],
  bootstrap: [AppComponent]
})
export class AppModule { }

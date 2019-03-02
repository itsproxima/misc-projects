import {ModuleWithProviders, NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import {UpdateProductComponent} from "./components/update-product/update-product.component";
import {ReportComponent} from "./components/report/report.component";
import { AssignComponent } from './components/assign/assign.component';
import { BulkComponent } from '../app/components/bulkUpload/bulkUpload.component';

const appRoutes : Routes = [

    {path:"", component: LoginComponent},
    {path:"dashboard", component: OrderDetailsComponent},
    {path:"login", component: LoginComponent},
    {path:"OrderHistory",component:OrderHistoryComponent},
    {path:"OrderDetails",component:OrderDetailsComponent},
    {path:"addProduct",component:UpdateProductComponent},
    {path:"Report",component:ReportComponent},
    {path:"Delivery",component:AssignComponent},
    {path:"bulkUpload",component:BulkComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
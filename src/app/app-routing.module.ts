import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrinterSelectionDashboardComponent } from './printer-selection-dashboard/printer-selection-dashboard.component';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'printerselection', component: PrinterSelectionDashboardComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'login', component: LoginComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

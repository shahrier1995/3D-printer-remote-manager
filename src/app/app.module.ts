import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { PrintSectionComponent } from './print-section/print-section.component';
import { FileSystemComponent } from './file-system/file-system.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CameraViewComponent } from './camera-view/camera-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { ErrorComponent } from './error/error.component';
import { TabMenuComponent } from './tab-menu/tab-menu.component';
import {MatTableModule} from '@angular/material/table';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { NotificationComponent } from './notification/notification.component';
import { ModelGalleryComponent } from './model-gallery/model-gallery.component';
import { PrinterSelectionDashboardComponent } from './printer-selection-dashboard/printer-selection-dashboard.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginComponent } from './login/login.component';
import { TerminalComponent } from './terminal/terminal.component';
import { ChatIconComponent } from './chat-icon/chat-icon.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { BookingPrinterComponent } from './booking-printer/booking-printer.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { GGodeViewerComponent } from './g-gode-viewer/g-gode-viewer.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    PrintSectionComponent,
    FileSystemComponent,
    CameraViewComponent,
    ErrorComponent,
    TabMenuComponent,
    ProfileSettingsComponent,
    NotificationComponent,
    ModelGalleryComponent,
    PrinterSelectionDashboardComponent,
    LoginComponent,
    TerminalComponent,
    ChatIconComponent,
    ChatBoxComponent,
    BookingPrinterComponent,
    TemperatureComponent,
    GGodeViewerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule,
    MatTabsModule,
    MatTableModule,
    MatTooltipModule,
    CanvasJSAngularChartsModule,
    ButtonsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

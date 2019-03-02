import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { SandboxComponent } from './components/sandbox.component';

import { TestComponent } from './sandbox/test.component';
import { DataService} from './services/data.service';
import 'rxjs';
import { SettingsComponent } from './settings/settings.component';
import { WeatherComponent } from './weather/weather.component';
import {HttpClientModule}  from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    SandboxComponent,
    TestComponent,
    SettingsComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
 

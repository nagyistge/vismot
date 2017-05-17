import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { D3Service } from 'd3-ng2-service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ScheduleTablesComponent } from './schedule-tables/schedule-tables.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScheduleTablesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }

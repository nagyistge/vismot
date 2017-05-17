import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { ScheduleTablesComponent } from './schedule-tables/schedule-tables.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'timetables',
    component: ScheduleTablesComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

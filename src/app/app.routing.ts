import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { ScheduleTablesComponent } from './schedule-tables/schedule-tables.component';
import { MareyComponent } from './marey/marey.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'timetables',
    component: ScheduleTablesComponent
  },
  {
    path: 'marey',
    component: MareyComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

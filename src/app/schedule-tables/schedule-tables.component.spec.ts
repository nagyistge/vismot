import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTablesComponent } from './schedule-tables.component';

describe('ScheduleTablesComponent', () => {
  let component: ScheduleTablesComponent;
  let fixture: ComponentFixture<ScheduleTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

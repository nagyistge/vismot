import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MareyComponent } from './marey.component';

describe('MareyComponent', () => {
  let component: MareyComponent;
  let fixture: ComponentFixture<MareyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MareyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MareyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

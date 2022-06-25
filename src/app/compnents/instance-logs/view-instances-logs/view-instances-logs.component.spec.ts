import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInstancesLogsComponent } from './view-instances-logs.component';

describe('ViewInstancesLogsComponent', () => {
  let component: ViewInstancesLogsComponent;
  let fixture: ComponentFixture<ViewInstancesLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInstancesLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInstancesLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

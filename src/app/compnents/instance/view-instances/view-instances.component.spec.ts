import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInstancesComponent } from './view-instances.component';

describe('ViewInstancesComponent', () => {
  let component: ViewInstancesComponent;
  let fixture: ComponentFixture<ViewInstancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInstancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInstancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

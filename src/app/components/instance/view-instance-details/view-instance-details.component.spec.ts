import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInstanceDetailsComponent } from './view-instance-details.component';

describe('ViewInstanceDetailsComponent', () => {
  let component: ViewInstanceDetailsComponent;
  let fixture: ComponentFixture<ViewInstanceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInstanceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInstanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

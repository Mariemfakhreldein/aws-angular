import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIntakesComponent } from './manage-intakes.component';

describe('ManageIntakesComponent', () => {
  let component: ManageIntakesComponent;
  let fixture: ComponentFixture<ManageIntakesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageIntakesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIntakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

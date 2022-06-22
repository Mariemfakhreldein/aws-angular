import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllIntakesComponent } from './show-all-intakes.component';

describe('ShowAllIntakesComponent', () => {
  let component: ShowAllIntakesComponent;
  let fixture: ComponentFixture<ShowAllIntakesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllIntakesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllIntakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

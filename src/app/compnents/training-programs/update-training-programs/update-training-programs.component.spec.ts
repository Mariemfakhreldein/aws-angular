import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTrainingProgramsComponent } from './update-training-programs.component';

describe('UpdateTrainingProgramsComponent', () => {
  let component: UpdateTrainingProgramsComponent;
  let fixture: ComponentFixture<UpdateTrainingProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTrainingProgramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTrainingProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

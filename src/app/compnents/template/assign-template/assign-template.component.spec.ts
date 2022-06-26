import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTemplateComponent } from './assign-template.component';

describe('AssignTemplateComponent', () => {
  let component: AssignTemplateComponent;
  let fixture: ComponentFixture<AssignTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

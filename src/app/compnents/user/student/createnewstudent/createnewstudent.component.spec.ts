import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewstudentComponent } from './createnewstudent.component';

describe('CreatenewstudentComponent', () => {
  let component: CreatenewstudentComponent;
  let fixture: ComponentFixture<CreatenewstudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatenewstudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatenewstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

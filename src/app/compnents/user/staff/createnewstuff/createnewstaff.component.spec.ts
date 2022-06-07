import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewstaffComponent } from './createnewstaff.component';

describe('CreatenewstuffComponent', () => {
  let component: CreatenewstaffComponent;
  let fixture: ComponentFixture<CreatenewstaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatenewstaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatenewstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

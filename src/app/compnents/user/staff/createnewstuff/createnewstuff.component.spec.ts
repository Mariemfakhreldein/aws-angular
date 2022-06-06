import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewstuffComponent } from './createnewstuff.component';

describe('CreatenewstuffComponent', () => {
  let component: CreatenewstuffComponent;
  let fixture: ComponentFixture<CreatenewstuffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatenewstuffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatenewstuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

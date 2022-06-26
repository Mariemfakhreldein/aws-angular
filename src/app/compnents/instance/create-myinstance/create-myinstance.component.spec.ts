import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMyinstanceComponent } from './create-myinstance.component';

describe('CreateMyinstanceComponent', () => {
  let component: CreateMyinstanceComponent;
  let fixture: ComponentFixture<CreateMyinstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMyinstanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMyinstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

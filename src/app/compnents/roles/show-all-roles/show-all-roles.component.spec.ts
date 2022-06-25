import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllRolesComponent } from './show-all-roles.component';

describe('ShowAllRolesComponent', () => {
  let component: ShowAllRolesComponent;
  let fixture: ComponentFixture<ShowAllRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

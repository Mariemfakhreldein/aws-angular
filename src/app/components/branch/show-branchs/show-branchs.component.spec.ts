import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBranchsComponent } from './show-branchs.component';

describe('ShowBranchsComponent', () => {
  let component: ShowBranchsComponent;
  let fixture: ComponentFixture<ShowBranchsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBranchsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBranchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

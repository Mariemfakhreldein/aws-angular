import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBranchComponent } from './detail-branch.component';

describe('DetailBranchComponent', () => {
  let component: DetailBranchComponent;
  let fixture: ComponentFixture<DetailBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailBranchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

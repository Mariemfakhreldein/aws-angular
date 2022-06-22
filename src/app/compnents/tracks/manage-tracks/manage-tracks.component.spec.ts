import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTracksComponent } from './manage-tracks.component';

describe('ManageTracksComponent', () => {
  let component: ManageTracksComponent;
  let fixture: ComponentFixture<ManageTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTracksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

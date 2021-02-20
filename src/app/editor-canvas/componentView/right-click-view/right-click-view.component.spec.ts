import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightClickViewComponent } from './right-click-view.component';

describe('RightClickViewComponent', () => {
  let component: RightClickViewComponent;
  let fixture: ComponentFixture<RightClickViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightClickViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightClickViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

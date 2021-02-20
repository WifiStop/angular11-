import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewButtonViewComponent } from './preview-button-view.component';

describe('PreviewButtonViewComponent', () => {
  let component: PreviewButtonViewComponent;
  let fixture: ComponentFixture<PreviewButtonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewButtonViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewButtonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

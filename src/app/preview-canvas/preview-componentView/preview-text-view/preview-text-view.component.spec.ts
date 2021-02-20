import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewTextViewComponent } from './preview-text-view.component';

describe('PreviewTextViewComponent', () => {
  let component: PreviewTextViewComponent;
  let fixture: ComponentFixture<PreviewTextViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewTextViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewTextViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

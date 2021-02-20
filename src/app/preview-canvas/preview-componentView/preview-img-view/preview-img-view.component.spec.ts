import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewImgViewComponent } from './preview-img-view.component';

describe('PreviewImgViewComponent', () => {
  let component: PreviewImgViewComponent;
  let fixture: ComponentFixture<PreviewImgViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewImgViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewImgViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

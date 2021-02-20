import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkLineComponent } from './mark-line.component';

describe('MarkLineComponent', () => {
  let component: MarkLineComponent;
  let fixture: ComponentFixture<MarkLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

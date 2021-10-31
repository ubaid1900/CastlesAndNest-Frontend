import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyoutWrapperComponent } from './flyout-wrapper.component';

describe('FlyoutWrapperComponent', () => {
  let component: FlyoutWrapperComponent;
  let fixture: ComponentFixture<FlyoutWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlyoutWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyoutWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

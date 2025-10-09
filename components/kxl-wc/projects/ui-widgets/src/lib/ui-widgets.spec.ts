import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiWidgets } from './ui-widgets';

describe('UiWidgets', () => {
  let component: UiWidgets;
  let fixture: ComponentFixture<UiWidgets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiWidgets],
    }).compileComponents();

    fixture = TestBed.createComponent(UiWidgets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

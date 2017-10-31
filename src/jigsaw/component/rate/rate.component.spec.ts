import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateComponent } from './rate.component';

describe('RateComponent', () => {
  let component: RateComponent;
  let fixture: ComponentFixture<RateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

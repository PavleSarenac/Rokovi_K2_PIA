import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmetnineComponent } from './umetnine.component';

describe('UmetnineComponent', () => {
  let component: UmetnineComponent;
  let fixture: ComponentFixture<UmetnineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UmetnineComponent]
    });
    fixture = TestBed.createComponent(UmetnineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

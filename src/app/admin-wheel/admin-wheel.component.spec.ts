import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWheelComponent } from './admin-wheel.component';

describe('AdminWheelComponent', () => {
  let component: AdminWheelComponent;
  let fixture: ComponentFixture<AdminWheelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminWheelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

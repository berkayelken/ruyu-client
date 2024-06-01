import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWheelPanelComponent } from './admin-wheel-panel.component';

describe('AdminWheelPanelComponent', () => {
  let component: AdminWheelPanelComponent;
  let fixture: ComponentFixture<AdminWheelPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminWheelPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminWheelPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

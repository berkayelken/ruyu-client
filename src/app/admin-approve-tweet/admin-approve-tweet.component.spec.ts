import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApproveTweetComponent } from './admin-approve-tweet.component';

describe('AdminApproveTweetComponent', () => {
  let component: AdminApproveTweetComponent;
  let fixture: ComponentFixture<AdminApproveTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminApproveTweetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminApproveTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

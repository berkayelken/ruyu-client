import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinniesComponent } from './minnies.component';

describe('MinniesComponent', () => {
  let component: MinniesComponent;
  let fixture: ComponentFixture<MinniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinniesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheloreComponent } from './thelore.component';

describe('TheloreComponent', () => {
  let component: TheloreComponent;
  let fixture: ComponentFixture<TheloreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheloreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TheloreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

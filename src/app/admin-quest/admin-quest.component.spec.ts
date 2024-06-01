import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuestComponent } from './admin-quest.component';

describe('AdminQuestComponent', () => {
  let component: AdminQuestComponent;
  let fixture: ComponentFixture<AdminQuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminQuestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

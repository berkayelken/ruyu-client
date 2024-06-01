import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuestPanelComponent } from './admin-quest-panel.component';

describe('AdminQuestPanelComponent', () => {
  let component: AdminQuestPanelComponent;
  let fixture: ComponentFixture<AdminQuestPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminQuestPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminQuestPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

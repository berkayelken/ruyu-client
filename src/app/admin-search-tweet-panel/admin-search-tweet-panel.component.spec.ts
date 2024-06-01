import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSearchTweetPanelComponent } from './admin-search-tweet-panel.component';

describe('AdminSearchTweetPanelComponent', () => {
  let component: AdminSearchTweetPanelComponent;
  let fixture: ComponentFixture<AdminSearchTweetPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSearchTweetPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSearchTweetPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

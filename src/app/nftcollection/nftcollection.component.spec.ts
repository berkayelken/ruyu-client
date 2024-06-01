import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftcollectionComponent } from './nftcollection.component';

describe('NftcollectionComponent', () => {
  let component: NftcollectionComponent;
  let fixture: ComponentFixture<NftcollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NftcollectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NftcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

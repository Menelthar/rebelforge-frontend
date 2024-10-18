import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistAvailabilityComponent } from './artist-availability.component';

describe('ArtistAvailabilityComponent', () => {
  let component: ArtistAvailabilityComponent;
  let fixture: ComponentFixture<ArtistAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistAvailabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentNotificationsComponent } from './appointment-notifications.component';

describe('AppointmentNotificationsComponent', () => {
  let component: AppointmentNotificationsComponent;
  let fixture: ComponentFixture<AppointmentNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentNotificationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

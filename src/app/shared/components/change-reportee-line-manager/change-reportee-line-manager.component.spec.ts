import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeReporteeLineManagerComponent } from './change-reportee-line-manager.component';

describe('ChangeReporteeLineManagerComponent', () => {
  let component: ChangeReporteeLineManagerComponent;
  let fixture: ComponentFixture<ChangeReporteeLineManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeReporteeLineManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeReporteeLineManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

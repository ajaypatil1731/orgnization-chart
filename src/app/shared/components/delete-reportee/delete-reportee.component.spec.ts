import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReporteeComponent } from './delete-reportee.component';

describe('DeleteReporteeComponent', () => {
  let component: DeleteReporteeComponent;
  let fixture: ComponentFixture<DeleteReporteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteReporteeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteReporteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

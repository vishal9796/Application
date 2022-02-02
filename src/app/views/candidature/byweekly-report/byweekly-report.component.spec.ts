import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByweeklyReportComponent } from './byweekly-report.component';

describe('ByweeklyReportComponent', () => {
  let component: ByweeklyReportComponent;
  let fixture: ComponentFixture<ByweeklyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByweeklyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByweeklyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedReportComponent } from './combined-report.component';

describe('CombinedReportComponent', () => {
  let component: CombinedReportComponent;
  let fixture: ComponentFixture<CombinedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombinedReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

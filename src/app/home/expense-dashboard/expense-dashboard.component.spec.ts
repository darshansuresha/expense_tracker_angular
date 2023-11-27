import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseDashboardComponent } from './expense-dashboard.component';

describe('ExpenseDashboardComponent', () => {
  let component: ExpenseDashboardComponent;
  let fixture: ComponentFixture<ExpenseDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpenseDashboardComponent]
    });
    fixture = TestBed.createComponent(ExpenseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBudgetComponent } from './my-budget.component';

describe('MyBudgetComponent', () => {
  let component: MyBudgetComponent;
  let fixture: ComponentFixture<MyBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBudgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

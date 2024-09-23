import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface BudgetItem {
  id: number;
  name: string;
  price: number;
  dueDate: string;
  frequency: 'monthly' | 'yearly';
  paid: boolean;
  details: string;
}

@Component({
  selector: 'app-my-budget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-budget.component.html',
  styleUrls: ['./my-budget.component.scss']
})
export class MyBudgetComponent implements OnInit {
  budgetItems: BudgetItem[] = [];
  newBudgetItem: BudgetItem = { id: 0, name: '', price: 0, dueDate: '', frequency: 'monthly', paid: false, details: '' };
  showDetails: { [key: number]: boolean } = {};

  ngOnInit(): void {
    // Initialize with some dummy data
    this.budgetItems = [
      { id: 1, name: 'Mortgage', price: 940, dueDate: '2023-10-01', frequency: 'monthly', paid: false, details: 'Monthly mortgage payment' },
      { id: 2, name: 'Food', price: 500, dueDate: '2023-10-05', frequency: 'monthly', paid: true, details: 'Monthly food expenses' },
      { id: 3, name: 'Car', price: 860, dueDate: '2023-10-01', frequency: 'monthly', paid: false, details: 'Monthly car payment' },
      { id: 4, name: 'Insurance', price: 177, dueDate: '2023-10-05', frequency: 'monthly', paid: true, details: 'Monthly insurance payment' },
      { id: 5, name: 'Gym Membership', price: 50, dueDate: '2023-10-05', frequency: 'monthly', paid: true, details: 'Monthly gym membership fee' }
    ];
  }

  addBudgetItem(): void {
    if (this.newBudgetItem.name && this.newBudgetItem.price && this.newBudgetItem.dueDate) {
      this.newBudgetItem.id = this.budgetItems.length + 1;
      this.budgetItems.push({ ...this.newBudgetItem });
      this.newBudgetItem = { id: 0, name: '', price: 0, dueDate: '', frequency: 'monthly', paid: false, details: '' };
    }
  }

  togglePaid(item: BudgetItem): void {
    item.paid = !item.paid;
  }

  toggleDetails(itemId: number): void {
    this.showDetails[itemId] = !this.showDetails[itemId];
  }

  getMonthlyCost(): number {
    return this.budgetItems.filter(item => item.frequency === 'monthly').reduce((sum, item) => sum + item.price, 0);
  }

  getYearlyCost(): number {
    return this.budgetItems.filter(item => item.frequency === 'yearly').reduce((sum, item) => sum + item.price, 0);
  }

  getTotalYearlyCost(): number {
    return this.getMonthlyCost() * 12 + this.getYearlyCost();
  }

  getTotalPaid(): number {
    return this.budgetItems.filter(item => item.paid).reduce((sum, item) => sum + item.price, 0);
  }

  getTotalUnpaid(): number {
    return this.budgetItems.filter(item => !item.paid).reduce((sum, item) => sum + item.price, 0);
  }
}
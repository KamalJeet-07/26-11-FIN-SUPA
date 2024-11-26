import React from 'react';
import { ShoppingBag, Home, Car, Utensils, Tv } from 'lucide-react';

const budgets = [
  { category: 'Housing', spent: 1200, limit: 1500, icon: Home, color: 'bg-indigo-600' },
  { category: 'Food', spent: 800, limit: 1000, icon: Utensils, color: 'bg-emerald-600' },
  { category: 'Transport', spent: 400, limit: 500, icon: Car, color: 'bg-amber-600' },
  { category: 'Shopping', spent: 300, limit: 400, icon: ShoppingBag, color: 'bg-red-600' },
  { category: 'Entertainment', spent: 200, limit: 300, icon: Tv, color: 'bg-purple-600' },
];

export default function BudgetProgress() {
  return (
    <div className="space-y-4">
      {budgets.map((budget) => {
        const Icon = budget.icon;
        const percentage = (budget.spent / budget.limit) * 100;
        
        return (
          <div key={budget.category} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{budget.category}</span>
              </div>
              <span className="text-sm text-gray-500">
                ${budget.spent} / ${budget.limit}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${budget.color}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
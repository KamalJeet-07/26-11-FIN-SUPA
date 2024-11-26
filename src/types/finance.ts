export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: Date;
  user_id?: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  month: Date;
  user_id?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  user_id?: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  monthlyBudget: number;
}
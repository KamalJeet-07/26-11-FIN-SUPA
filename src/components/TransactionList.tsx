import React from 'react';
import { ArrowUpRight, ArrowDownRight, ShoppingBag, Home, Car, Utensils, Tv, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useFinanceStore } from '../store/useFinanceStore';

const formatIndianCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
};

export default function TransactionList() {
  const { transactions, deleteTransaction } = useFinanceStore();

  return (
    <div className="space-y-4">
      {transactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No transactions found. Add your first transaction!
        </div>
      ) : (
        transactions.map((transaction) => {
          const isIncome = transaction.type === 'income';
          
          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  isIncome ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {isIncome ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className={`font-medium ${
                    isIncome ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isIncome ? '+' : '-'}{formatIndianCurrency(transaction.amount)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(transaction.date), 'MMM d, yyyy')}
                  </p>
                </div>
                <button
                  onClick={() => deleteTransaction(transaction.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
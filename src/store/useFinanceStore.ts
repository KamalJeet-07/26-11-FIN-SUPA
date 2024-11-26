import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Transaction, Budget, Category } from '../types/finance';
import { toast } from 'react-hot-toast';

interface FinanceState {
  transactions: Transaction[];
  budgets: Budget[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<boolean>;
  fetchTransactions: () => Promise<void>;
  updateBudget: (budget: Budget) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  transactions: [],
  budgets: [],
  categories: [],
  isLoading: false,
  error: null,

  addTransaction: async (transaction) => {
    try {
      set({ isLoading: true, error: null });
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('transactions')
        .insert([{
          ...transaction,
          user_id: userData.user.id
        }])
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        transactions: [...state.transactions, data as Transaction],
        error: null
      }));
      toast.success('Transaction added successfully');
      return true;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to add transaction';
      set({ error: errorMessage });
      toast.error(errorMessage);
      console.error('Error:', error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTransactions: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) {
        throw new Error('Please sign in to view transactions');
      }

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userData.user.id)
        .order('date', { ascending: false });

      if (error) throw error;

      set({ transactions: data as Transaction[], error: null });
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to fetch transactions';
      set({ error: errorMessage });
      toast.error(errorMessage);
      console.error('Error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateBudget: async (budget) => {
    try {
      set({ isLoading: true, error: null });
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('budgets')
        .update({
          ...budget,
          user_id: userData.user.id
        })
        .eq('category', budget.category);

      if (error) throw error;

      set((state) => ({
        budgets: state.budgets.map((b) =>
          b.category === budget.category ? budget : b
        ),
        error: null
      }));
      toast.success('Budget updated successfully');
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to update budget';
      set({ error: errorMessage });
      toast.error(errorMessage);
      console.error('Error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTransaction: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
        error: null
      }));
      toast.success('Transaction deleted successfully');
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to delete transaction';
      set({ error: errorMessage });
      toast.error(errorMessage);
      console.error('Error:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create transactions table
create table public.transactions (
  id uuid default uuid_generate_v4() primary key,
  description text not null,
  amount decimal(12,2) not null,
  category text not null,
  type text not null check (type in ('income', 'expense')),
  date timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id)
);

-- Create categories table
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  icon text not null,
  color text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id)
);

-- Create budgets table
create table public.budgets (
  id uuid default uuid_generate_v4() primary key,
  category text not null,
  limit decimal(12,2) not null,
  spent decimal(12,2) default 0 not null,
  month date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id),
  unique(category, month, user_id)
);

-- Create RLS policies
alter table public.transactions enable row level security;
alter table public.categories enable row level security;
alter table public.budgets enable row level security;

-- Create policies
create policy "Users can view their own transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own transactions"
  on public.transactions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own transactions"
  on public.transactions for update
  using (auth.uid() = user_id);

create policy "Users can delete their own transactions"
  on public.transactions for delete
  using (auth.uid() = user_id);

-- Repeat for categories and budgets
create policy "Users can view their own categories"
  on public.categories for select
  using (auth.uid() = user_id);

create policy "Users can insert their own categories"
  on public.categories for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own categories"
  on public.categories for update
  using (auth.uid() = user_id);

create policy "Users can delete their own categories"
  on public.categories for delete
  using (auth.uid() = user_id);

create policy "Users can view their own budgets"
  on public.budgets for select
  using (auth.uid() = user_id);

create policy "Users can insert their own budgets"
  on public.budgets for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own budgets"
  on public.budgets for update
  using (auth.uid() = user_id);

create policy "Users can delete their own budgets"
  on public.budgets for delete
  using (auth.uid() = user_id);

-- Insert default categories
insert into public.categories (name, icon, color, user_id)
values 
  ('Housing', 'Home', '#4F46E5', auth.uid()),
  ('Food', 'Utensils', '#10B981', auth.uid()),
  ('Transport', 'Car', '#F59E0B', auth.uid()),
  ('Utilities', 'Zap', '#EF4444', auth.uid()),
  ('Entertainment', 'Tv', '#8B5CF6', auth.uid()),
  ('Shopping', 'ShoppingBag', '#EC4899', auth.uid()),
  ('Income', 'TrendingUp', '#059669', auth.uid());
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tyltnlvxbxwbnqgybrvd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5bHRubHZ4Ynh3Ym5xZ3licnZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MTkxNjUsImV4cCI6MjA0ODE5NTE2NX0.gN_Ifn8OOaSKb78owAbB_0GUWMcBJd3WVaf0SN_mECY';

export const supabase = createClient(supabaseUrl, supabaseKey);
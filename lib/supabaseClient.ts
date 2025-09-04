import { createClient } from '@supabase/supabase-js';

// تعريف متغيرات البيئة لـ Supabase
const supabaseUrl = 'https://uywitzqmrhtbwguqzjxd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5d2l0enFtcmh0YndndXF6anhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5ODUzMDIsImV4cCI6MjA3MjU2MTMwMn0.m1LhoKbZMB7_crsUZzW-dG2IBu6DmXBPcPLdzCMskJ4';

// إنشاء عميل Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
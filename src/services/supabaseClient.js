// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vtodlpnbkrplokelplvy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0b2RscG5ia3JwbG9rZWxwbHZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMzE0NzEsImV4cCI6MjA2MTcwNzQ3MX0.zPLVDZFWzwbfxVHUVFqqzfzyDAUz_U8cs4zCiCrGKzU'
export const supabase = createClient(supabaseUrl, supabaseKey)

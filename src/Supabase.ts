import { createClient } from '@supabase/supabase-js';
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltZHBhenhzZ2Zjc2x6amlieHVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg4MjI0MTcsImV4cCI6MTk4NDM5ODQxN30.EQd6p_IyCxAbmUzgrRg8GdZxXxHY3ZXABpDuTjiMv18
///dT3TZFPXFuCmjASC
const supaBase = createClient(
  'https://imdpazxsgfcslzjibxup.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltZHBhenhzZ2Zjc2x6amlieHVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg4MjI0MTcsImV4cCI6MTk4NDM5ODQxN30.EQd6p_IyCxAbmUzgrRg8GdZxXxHY3ZXABpDuTjiMv18'
);

export default supaBase;

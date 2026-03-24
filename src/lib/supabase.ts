// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Usamos URLs genéricas apenas para o site não travar no navegador
const supabaseUrl = 'https://placeholder-project.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy';

// O site vai parar de dar erro e vai carregar o visual
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log("Supabase em modo placeholder: Site liberado para visualização.");
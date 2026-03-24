/*
  # PreventPlus Referral Tracking System

  ## Overview
  Database schema for managing referral tracking, indicator performance, and lead generation.

  ## New Tables
  
  ### `indicadores`
  Stores information about each referral indicator (001-050)
  - `id` (text, primary key) - Indicator ID (e.g., "001", "002")
  - `nome_contato` (text) - Name of the contact person
  - `whatsapp` (text) - WhatsApp number of the indicator
  - `local` (text) - Location/building where material was distributed
  - `ativo` (boolean, default true) - Whether the indicator is active
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `visitas`
  Tracks each visit with a referral ID
  - `id` (uuid, primary key) - Unique visit ID
  - `ref_id` (text, foreign key) - References indicadores.id
  - `ip_address` (text) - Visitor's IP address (optional)
  - `user_agent` (text) - Browser user agent
  - `created_at` (timestamptz) - Visit timestamp

  ### `leads`
  Stores captured leads from the form
  - `id` (uuid, primary key) - Unique lead ID
  - `ref_id` (text, foreign key) - References indicadores.id
  - `nome` (text, not null) - Lead's name
  - `telefone` (text, not null) - Lead's phone number
  - `idade` (integer) - Lead's age
  - `tipo_plano` (text) - Preferred plan type (enfermaria/apartamento)
  - `created_at` (timestamptz) - Lead capture timestamp

  ## Security
  - Enable RLS on all tables
  - Public can insert visits and leads
  - Only authenticated users can read/update indicators
*/

-- Create indicadores table
CREATE TABLE IF NOT EXISTS indicadores (
  id text PRIMARY KEY,
  nome_contato text,
  whatsapp text,
  local text,
  ativo boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create visitas table
CREATE TABLE IF NOT EXISTS visitas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_id text REFERENCES indicadores(id),
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_id text REFERENCES indicadores(id),
  nome text NOT NULL,
  telefone text NOT NULL,
  idade integer,
  tipo_plano text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE indicadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policies for indicadores (only authenticated users can manage)
CREATE POLICY "Authenticated users can read indicadores"
  ON indicadores FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert indicadores"
  ON indicadores FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update indicadores"
  ON indicadores FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for visitas (public can insert, authenticated can read)
CREATE POLICY "Anyone can insert visitas"
  ON visitas FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read visitas"
  ON visitas FOR SELECT
  TO authenticated
  USING (true);

-- Policies for leads (public can insert, authenticated can read)
CREATE POLICY "Anyone can insert leads"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);

-- Insert initial indicator IDs (001-050)
INSERT INTO indicadores (id) 
SELECT LPAD(generate_series(1, 50)::text, 4, '0')
ON CONFLICT (id) DO NOTHING;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_visitas_ref_id ON visitas(ref_id);
CREATE INDEX IF NOT EXISTS idx_leads_ref_id ON leads(ref_id);
CREATE INDEX IF NOT EXISTS idx_visitas_created_at ON visitas(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
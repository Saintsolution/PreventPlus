export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      indicadores: {
        Row: {
          id: string
          nome_contato: string | null
          whatsapp: string | null
          local: string | null
          ativo: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          nome_contato?: string | null
          whatsapp?: string | null
          local?: string | null
          ativo?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nome_contato?: string | null
          whatsapp?: string | null
          local?: string | null
          ativo?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      visitas: {
        Row: {
          id: string
          ref_id: string | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          ref_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          ref_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          ref_id: string | null
          nome: string
          telefone: string
          idade: number | null
          tipo_plano: string | null
          created_at: string
        }
        Insert: {
          id?: string
          ref_id?: string | null
          nome: string
          telefone: string
          idade?: number | null
          tipo_plano?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          ref_id?: string | null
          nome?: string
          telefone?: string
          idade?: number | null
          tipo_plano?: string | null
          created_at?: string
        }
      }
    }
  }
}

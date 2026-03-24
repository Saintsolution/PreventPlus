# PreventPlus - Landing Page de Alta Conversão

Landing page profissional para revenda autorizada do plano Prevent Ma+s, com sistema completo de rastreamento de indicadores e gestão de leads.

## Recursos Principais

### Landing Page
- Design sofisticado em Azul Marinho, Dourado e Branco
- Hero Section com CTAs estratégicos
- Diferenciais do plano com cards animados
- Rede de Cuidado com unidades temáticas
- Tabela de preços responsiva
- Formulário de captura de leads
- 100% responsivo para todos os dispositivos

### Sistema de Rastreamento
- Captura automática de parâmetro `?ref=` na URL
- Persistência no localStorage
- Envio silencioso de visitas para webhook
- Registro de visitas e leads no banco de dados

### Painel Administrativo (`/admin`)
- Autenticação mock (senha: `admin123`)
- Dashboard com métricas em tempo real
- Gestão de 50 indicadores (IDs 0001-0050)
- Cadastro de informações do indicador (nome, WhatsApp, local)
- Visualização de performance (visitas e leads por ID)
- Taxa de conversão por indicador
- Gerador de links personalizados
- Busca e filtros

## Configuração

### 1. Variáveis de Ambiente

Atualize o arquivo `.env` com suas credenciais:

```env
VITE_SUPABASE_URL=sua-url-do-supabase
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
VITE_WEBHOOK_URL=https://n8n.saintsolution.com.br/webhook/a57e4858-d4d7-4071-8a94-2b1589d618c7
```

### 2. Instalação

```bash
npm install
```

### 3. Desenvolvimento

```bash
npm run dev
```

### 4. Build de Produção

```bash
npm run build
```

## Uso do Sistema

### Para Indicadores

1. Acesse o link personalizado: `https://seusite.com.br/?ref=0001`
2. O sistema rastreia automaticamente a visita
3. Leads gerados são vinculados ao ID do indicador

### Para Administração

1. Acesse `/admin`
2. Entre com a senha: `admin123`
3. Gerencie indicadores e visualize métricas
4. Copie links personalizados para distribuição

## Estrutura do Banco de Dados

### Tabela: indicadores
- Armazena informações dos 50 indicadores
- Campos: id, nome_contato, whatsapp, local, ativo

### Tabela: visitas
- Registra cada acesso com ref
- Campos: id, ref_id, ip_address, user_agent, created_at

### Tabela: leads
- Armazena leads capturados
- Campos: id, ref_id, nome, telefone, idade, tipo_plano, created_at

## Tecnologias

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Supabase (Database)
- Lucide React (Ícones)

## Segurança

- Row Level Security (RLS) habilitado em todas as tabelas
- Autenticação no painel admin
- Validação de formulários
- Proteção contra injeção SQL

## Webhook Integration

O sistema envia notificações para webhook (n8n) nos seguintes eventos:
- Nova visita com ref
- Novo lead capturado

Formato do payload:
```json
{
  "type": "visit" | "lead",
  "ref_id": "0001",
  "timestamp": "2024-01-01T00:00:00.000Z",
  ...dados adicionais
}
```
# PreventPlus

⚡

**EVERMIND**

Technical Architecture & Product Specification

Para Gemini CLI · Versão 1.0 · 2025

+-----------------------------------------------------------------------+
| **Ideia → Estrutura em segundos**                                     |
|                                                                       |
| SaaS B2C para founders, vibe coders e empreendedores                  |
|                                                                       |
| Next.js · Supabase · Stripe · Gemini AI · Vercel                      |
+-----------------------------------------------------------------------+

**Stack: Clean Architecture · MVC · Domain-Driven Design**

Documento técnico gerado para uso com Gemini CLI

**0. Contexto para o Gemini CLI**

Este documento é uma especificação técnica completa do projeto EverMind.
Ele foi criado para ser usado como contexto primário ao trabalhar com o
Gemini CLI. Ao receber este documento, o Gemini CLI deve:

1.  Entender a visão completa do produto antes de escrever qualquer
    linha de código

2.  Seguir rigorosamente a arquitetura Clean Architecture + MVC definida
    neste documento

3.  Manter consistência de nomenclatura, estrutura de pastas e padrões
    em todos os arquivos gerados

4.  Questionar antes de desviar de qualquer decisão arquitetural
    definida aqui

5.  Priorizar código sustentável, testável e escalável acima de
    velocidade de entrega

+-----------------------------------------------------------------------+
| **🤖 Instrução ao Gemini CLI**                                        |
|                                                                       |
| Ao receber este documento, responda: \'EverMind spec carregada.       |
| Arquitetura Clean MVC compreendida. Pronto para iniciar a             |
| implementação por módulo.\' Depois aguarde instruções de qual módulo  |
| implementar primeiro.                                                 |
+-----------------------------------------------------------------------+

**1. Visão do Produto**

**1.1 O que é o EverMind**

EverMind é uma plataforma SaaS B2C que transforma ideias brutas em
estruturas acionáveis para founders, vibe coders e empreendedores. O
usuário descreve sua ideia em linguagem natural e recebe
instantaneamente documentos estruturados como PRD, Plano de MVP, Pitch,
Análise de Riscos e Stack Técnica --- gerados por IA, editáveis em
markdown e organizados em workspace pessoal.

+-----------------------------------------------------------------------+
| **💡 Posicionamento**                                                 |
|                                                                       |
| EverMind não é mais um chat com IA. É um workspace de ideias com IA   |
| especializada --- como o Notion encontra o ChatGPT, mas construído    |
| especificamente para o momento de concepção e estruturação de         |
| produtos digitais.                                                    |
+-----------------------------------------------------------------------+

**1.2 Proposta de Valor**

  ------------------ -------------------------- --------------------------
  **Para quem**      **Problema atual**         **EverMind resolve**

  Founder solo       Horas estruturando ideias  PRD completo em 30
                     no Notion                  segundos

  Vibe coder         Começa a codar sem         Plano de MVP antes do
                     estrutura clara            primeiro commit

  Empreendedor       Não sabe por onde começar  Pitch e análise de riscos
  iniciante                                     instantâneos

  Estudante de       Aprende teoria sem prática Vê frameworks aplicados na
  produto                                       sua ideia
  ------------------ -------------------------- --------------------------

**1.3 Diferenciais Competitivos**

-   Foco cirúrgico: diferente de ferramentas genéricas, cada output é
    otimizado para o contexto de produto

-   Editor de markdown integrado com preview em tempo real

-   Histórico persistente organizado por workspace e projeto

-   Colaboração: compartilhar ideias e outputs com co-fundadores

-   Exportação para Notion, PDF e Google Docs

-   Templates de prompts da comunidade

-   Modo CLI: API pública para integrar com ferramentas como o próprio
    Gemini CLI

**2. Arquitetura Técnica**

**2.1 Princípios Arquiteturais**

+-----------------------------------------------------------------------+
| **🏗 Clean Architecture + MVC**                                        |
|                                                                       |
| O projeto segue Clean Architecture com separação clara entre Domain,  |
| Application, Infrastructure e Presentation. O padrão MVC é aplicado   |
| nas rotas Next.js (API Routes como Controller, Services como Model,   |
| React Components como View). Nenhuma lógica de negócio vive no        |
| componente React ou na API Route diretamente.                         |
+-----------------------------------------------------------------------+

-   Single Responsibility: cada arquivo tem uma única responsabilidade

-   Dependency Inversion: camadas superiores não dependem de
    implementações, apenas de interfaces

-   DRY (Don\'t Repeat Yourself): lógica compartilhada vive em /lib ou
    /services

-   Fail Fast: validação na borda da aplicação com Zod

-   Zero Trust: toda request autenticada, toda entrada sanitizada

-   Observability First: logs estruturados, métricas e traces desde o
    dia 1

**2.2 Stack Tecnológica**

  ---------------- ---------------- ------------ ----------------------------
  **Camada**       **Tecnologia**   **Versão**   **Justificativa**

  Frontend         Next.js (App     14+          SSR, RSC, file-based
                   Router)                       routing, edge functions

  Linguagem        TypeScript       5+           Type safety, DX superior,
                                                 contratos claros

  Estilização      Tailwind CSS +   Latest       Design system consistente,
                   shadcn/ui                     zero CSS custom

  Auth             Supabase Auth    Latest       OAuth, magic link, JWT, Row
                                                 Level Security

  Banco de dados   Supabase         Latest       SQL robusto, RLS, realtime,
                   (PostgreSQL)                  storage

  ORM              Prisma           5+           Type-safe queries,
                                                 migrations, schema as code

  IA               Google Gemini    2.0 Flash    Custo/performance ideal,
                   API                           grátis para dev

  Pagamento        Stripe           Latest       Padrão de mercado, webhooks
                                                 confiáveis

  Deploy           Vercel           Latest       Edge network, preview
                                                 deployments, CI/CD

  Validação        Zod              3+           Schema validation type-safe
                                                 end-to-end

  Estado global    Zustand          4+           Simples, performático, sem
                                                 boilerplate

  Email            Resend           Latest       API moderna, React Email
                                                 templates

  Analytics        PostHog          Latest       Product analytics
                                                 self-hostable

  Monitoramento    Sentry           Latest       Error tracking e performance
  ---------------- ---------------- ------------ ----------------------------

**2.3 Estrutura de Pastas**

A estrutura segue o padrão de grandes projetos Next.js com App Router,
separando claramente as responsabilidades:

+-----------------------------------------------------------------------+
| evermind/                                                             |
|                                                                       |
| ├── app/ \# Next.js App Router                                        |
|                                                                       |
| │ ├── (auth)/ \# Route group --- páginas de auth                      |
|                                                                       |
| │ │ ├── login/page.tsx                                                |
|                                                                       |
| │ │ └── signup/page.tsx                                               |
|                                                                       |
| │ ├── (dashboard)/ \# Route group --- app autenticado                 |
|                                                                       |
| │ │ ├── layout.tsx \# Dashboard layout com sidebar                    |
|                                                                       |
| │ │ ├── page.tsx \# Home --- lista de workspaces                      |
|                                                                       |
| │ │ ├── workspace/\[id\]/ \# Workspace individual                     |
|                                                                       |
| │ │ │ ├── page.tsx                                                    |
|                                                                       |
| │ │ │ └── idea/\[ideaId\]/page.tsx                                    |
|                                                                       |
| │ │ └── settings/ \# Config de conta e billing                        |
|                                                                       |
| │ ├── api/ \# API Routes (Controllers)                                |
|                                                                       |
| │ │ ├── ai/generate/route.ts \# POST --- gerar output com IA          |
|                                                                       |
| │ │ ├── ideas/route.ts \# CRUD de ideias                              |
|                                                                       |
| │ │ ├── workspaces/route.ts \# CRUD de workspaces                     |
|                                                                       |
| │ │ ├── stripe/ \# Webhooks do Stripe                                 |
|                                                                       |
| │ │ │ └── webhook/route.ts                                            |
|                                                                       |
| │ │ └── export/route.ts \# Export para PDF/Notion                     |
|                                                                       |
| │ ├── layout.tsx \# Root layout                                       |
|                                                                       |
| │ └── globals.css                                                     |
|                                                                       |
| │                                                                     |
|                                                                       |
| ├── components/ \# React Components (View)                            |
|                                                                       |
| │ ├── ui/ \# shadcn/ui base components                                |
|                                                                       |
| │ ├── layout/ \# Sidebar, Topbar, Footer                              |
|                                                                       |
| │ ├── idea/ \# IdeaEditor, IdeaCard, OutputRenderer                   |
|                                                                       |
| │ ├── workspace/ \# WorkspaceList, WorkspaceCard                      |
|                                                                       |
| │ └── billing/ \# PricingCard, UpgradeModal                           |
|                                                                       |
| │                                                                     |
|                                                                       |
| ├── lib/ \# Utilities e configurações                                 |
|                                                                       |
| │ ├── supabase/ \# Supabase client (server + browser)                 |
|                                                                       |
| │ │ ├── server.ts                                                     |
|                                                                       |
| │ │ └── client.ts                                                     |
|                                                                       |
| │ ├── stripe.ts \# Stripe client singleton                            |
|                                                                       |
| │ ├── gemini.ts \# Gemini AI client                                   |
|                                                                       |
| │ ├── validations/ \# Schemas Zod                                     |
|                                                                       |
| │ │ ├── idea.ts                                                       |
|                                                                       |
| │ │ └── workspace.ts                                                  |
|                                                                       |
| │ └── utils.ts \# Helpers gerais                                      |
|                                                                       |
| │                                                                     |
|                                                                       |
| ├── services/ \# Business Logic (Model)                               |
|                                                                       |
| │ ├── ai.service.ts \# Orquestra chamadas ao Gemini                   |
|                                                                       |
| │ ├── idea.service.ts \# CRUD + regras de negócio de ideias           |
|                                                                       |
| │ ├── workspace.service.ts \# CRUD de workspaces                      |
|                                                                       |
| │ ├── billing.service.ts \# Lógica de planos e limites                |
|                                                                       |
| │ └── export.service.ts \# Geração de PDF e export                    |
|                                                                       |
| │                                                                     |
|                                                                       |
| ├── types/ \# TypeScript types globais                                |
|                                                                       |
| │ ├── idea.ts                                                         |
|                                                                       |
| │ ├── workspace.ts                                                    |
|                                                                       |
| │ └── billing.ts                                                      |
|                                                                       |
| │                                                                     |
|                                                                       |
| ├── hooks/ \# Custom React hooks                                      |
|                                                                       |
| │ ├── useIdea.ts                                                      |
|                                                                       |
| │ ├── useWorkspace.ts                                                 |
|                                                                       |
| │ └── useSubscription.ts                                              |
|                                                                       |
| │                                                                     |
|                                                                       |
| ├── store/ \# Zustand stores                                          |
|                                                                       |
| │ ├── ideaStore.ts                                                    |
|                                                                       |
| │ └── workspaceStore.ts                                               |
|                                                                       |
| │                                                                     |
|                                                                       |
| ├── prisma/ \# Database schema                                        |
|                                                                       |
| │ ├── schema.prisma                                                   |
|                                                                       |
| │ └── migrations/                                                     |
|                                                                       |
| │                                                                     |
|                                                                       |
| ├── emails/ \# React Email templates                                  |
|                                                                       |
| │ ├── welcome.tsx                                                     |
|                                                                       |
| │ └── upgrade-confirmation.tsx                                        |
|                                                                       |
| │                                                                     |
|                                                                       |
| ├── middleware.ts \# Auth middleware Next.js                          |
|                                                                       |
| ├── .env.local \# Variáveis de ambiente (nunca commitar)              |
|                                                                       |
| ├── .env.example \# Template de variáveis                             |
|                                                                       |
| └── next.config.ts                                                    |
+-----------------------------------------------------------------------+

**3. Schema do Banco de Dados**

**3.1 Modelo de Dados**

O banco de dados usa PostgreSQL via Supabase. Row Level Security (RLS)
está ativado em todas as tabelas --- usuários só acessam seus próprios
dados, mesmo com queries diretas ao banco.

+-----------------------------------------------------------------------+
| \-- USERS (gerenciado pelo Supabase Auth)                             |
|                                                                       |
| \-- Tabela auth.users é criada automaticamente                        |
|                                                                       |
| \-- PROFILES (dados públicos do usuário)                              |
|                                                                       |
| CREATE TABLE profiles (                                               |
|                                                                       |
| id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,      |
|                                                                       |
| name TEXT,                                                            |
|                                                                       |
| avatar_url TEXT,                                                      |
|                                                                       |
| plan TEXT DEFAULT \'free\' CHECK (plan IN (\'free\', \'pro\',         |
| \'team\')),                                                           |
|                                                                       |
| stripe_customer_id TEXT UNIQUE,                                       |
|                                                                       |
| stripe_subscription_id TEXT UNIQUE,                                   |
|                                                                       |
| ideas_used_this_month INT DEFAULT 0,                                  |
|                                                                       |
| created_at TIMESTAMPTZ DEFAULT NOW(),                                 |
|                                                                       |
| updated_at TIMESTAMPTZ DEFAULT NOW()                                  |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- WORKSPACES (agrupa ideias por projeto/empresa)                    |
|                                                                       |
| CREATE TABLE workspaces (                                             |
|                                                                       |
| id UUID PRIMARY KEY DEFAULT gen_random_uuid(),                        |
|                                                                       |
| owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,              |
|                                                                       |
| name TEXT NOT NULL,                                                   |
|                                                                       |
| description TEXT,                                                     |
|                                                                       |
| emoji TEXT DEFAULT \'💡\',                                            |
|                                                                       |
| is_public BOOLEAN DEFAULT FALSE,                                      |
|                                                                       |
| created_at TIMESTAMPTZ DEFAULT NOW(),                                 |
|                                                                       |
| updated_at TIMESTAMPTZ DEFAULT NOW()                                  |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- IDEAS (cada ideia gerada)                                         |
|                                                                       |
| CREATE TABLE ideas (                                                  |
|                                                                       |
| id UUID PRIMARY KEY DEFAULT gen_random_uuid(),                        |
|                                                                       |
| workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,        |
|                                                                       |
| user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,               |
|                                                                       |
| title TEXT NOT NULL,                                                  |
|                                                                       |
| raw_idea TEXT NOT NULL,                                               |
|                                                                       |
| output_type TEXT NOT NULL CHECK (output_type IN                       |
| (\'prd\',\'mvp\',\'pitch\',\'risks\',\'stack\',\'custom\')),          |
|                                                                       |
| content_md TEXT NOT NULL,                                             |
|                                                                       |
| prompt_used TEXT,                                                     |
|                                                                       |
| model TEXT DEFAULT \'gemini-2.0-flash\',                              |
|                                                                       |
| tokens_used INT,                                                      |
|                                                                       |
| is_starred BOOLEAN DEFAULT FALSE,                                     |
|                                                                       |
| is_public BOOLEAN DEFAULT FALSE,                                      |
|                                                                       |
| public_slug TEXT UNIQUE,                                              |
|                                                                       |
| created_at TIMESTAMPTZ DEFAULT NOW(),                                 |
|                                                                       |
| updated_at TIMESTAMPTZ DEFAULT NOW()                                  |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- WORKSPACE_MEMBERS (colaboração)                                   |
|                                                                       |
| CREATE TABLE workspace_members (                                      |
|                                                                       |
| workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,        |
|                                                                       |
| user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,               |
|                                                                       |
| role TEXT DEFAULT \'viewer\' CHECK (role IN                           |
| (\'owner\',\'editor\',\'viewer\')),                                   |
|                                                                       |
| joined_at TIMESTAMPTZ DEFAULT NOW(),                                  |
|                                                                       |
| PRIMARY KEY (workspace_id, user_id)                                   |
|                                                                       |
| );                                                                    |
|                                                                       |
| \-- ROW LEVEL SECURITY                                                |
|                                                                       |
| ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;                       |
|                                                                       |
| ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;                     |
|                                                                       |
| ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;                          |
|                                                                       |
| \-- Policies: usuário só acessa seus próprios dados                   |
|                                                                       |
| CREATE POLICY \'Users can view own profile\'                          |
|                                                                       |
| ON profiles FOR SELECT USING (auth.uid() = id);                       |
|                                                                       |
| CREATE POLICY \'Users can manage own workspaces\'                     |
|                                                                       |
| ON workspaces FOR ALL USING (auth.uid() = owner_id);                  |
|                                                                       |
| CREATE POLICY \'Users can manage own ideas\'                          |
|                                                                       |
| ON ideas FOR ALL USING (auth.uid() = user_id);                        |
+-----------------------------------------------------------------------+

**4. Variáveis de Ambiente**

**4.1 Arquivo .env.example**

Nunca commitar o .env.local. O arquivo .env.example documenta todas as
variáveis necessárias sem valores reais.

+-----------------------------------------------------------------------+
| \# ── NEXT.JS ──                                                      |
|                                                                       |
| NEXT_PUBLIC_APP_URL=http://localhost:3000                             |
|                                                                       |
| NEXT_PUBLIC_APP_NAME=EverMind                                         |
|                                                                       |
| \# ── SUPABASE ──                                                     |
|                                                                       |
| NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co                     |
|                                                                       |
| NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc\...                             |
|                                                                       |
| SUPABASE_SERVICE_ROLE_KEY=eyJhbGc\... \# NUNCA expor no frontend      |
|                                                                       |
| \# ── GOOGLE GEMINI ──                                                |
|                                                                       |
| GEMINI_API_KEY=AIza\...                                               |
|                                                                       |
| \# ── STRIPE ──                                                       |
|                                                                       |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test\_\...                      |
|                                                                       |
| STRIPE_SECRET_KEY=sk_test\_\...                                       |
|                                                                       |
| STRIPE_WEBHOOK_SECRET=whsec\_\...                                     |
|                                                                       |
| STRIPE_PRICE_PRO_MONTHLY=price\_\...                                  |
|                                                                       |
| STRIPE_PRICE_PRO_YEARLY=price\_\...                                   |
|                                                                       |
| STRIPE_PRICE_TEAM_MONTHLY=price\_\...                                 |
|                                                                       |
| \# ── EMAIL (RESEND) ──                                               |
|                                                                       |
| RESEND_API_KEY=re\_\...                                               |
|                                                                       |
| EMAIL_FROM=noreply@evermind.app                                       |
|                                                                       |
| \# ── ANALYTICS ──                                                    |
|                                                                       |
| NEXT_PUBLIC_POSTHOG_KEY=phc\_\...                                     |
|                                                                       |
| NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com                      |
|                                                                       |
| \# ── MONITORAMENTO ──                                                |
|                                                                       |
| SENTRY_DSN=https://\...@sentry.io/\...                                |
|                                                                       |
| NEXT_PUBLIC_SENTRY_DSN=https://\...@sentry.io/\...                    |
|                                                                       |
| \# ── DATABASE (PRISMA) ──                                            |
|                                                                       |
| DATABASE                                                              |
| _URL=postgresql://postgres:password@db.xxxx.supabase.co:5432/postgres |
|                                                                       |
| DIRECT                                                                |
| _URL=postgresql://postgres:password@db.xxxx.supabase.co:5432/postgres |
+-----------------------------------------------------------------------+

**5. Funcionalidades por Módulo**

**5.1 Autenticação (Auth Module)**

-   Login com Google OAuth via Supabase Auth

-   Login com GitHub OAuth

-   Magic Link por email (passwordless)

-   Middleware Next.js protege todas as rotas /dashboard/\*

-   Refresh token automático --- sessão persistente

-   Logout com limpeza de cookies e redirect

+-----------------------------------------------------------------------+
| // middleware.ts --- protege rotas autenticadas                       |
|                                                                       |
| import { createMiddlewareClient } from                                |
| \'@supabase/auth-helpers-nextjs\'                                     |
|                                                                       |
| import { NextResponse } from \'next/server\'                          |
|                                                                       |
| export async function middleware(req) {                               |
|                                                                       |
| const res = NextResponse.next()                                       |
|                                                                       |
| const supabase = createMiddlewareClient({ req, res })                 |
|                                                                       |
| const { data: { session } } = await supabase.auth.getSession()        |
|                                                                       |
| if (!session && req.nextUrl.pathname.startsWith(\'/dashboard\')) {    |
|                                                                       |
| return NextResponse.redirect(new URL(\'/login\', req.url))            |
|                                                                       |
| }                                                                     |
|                                                                       |
| return res                                                            |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**5.2 Geração de Ideias (AI Module)**

-   5 tipos de output fixos: PRD, MVP, Pitch, Riscos, Stack Técnica

-   Prompt livre (custom) para usuários Pro

-   Streaming de resposta --- texto aparece enquanto é gerado

-   Retry automático em caso de falha da API

-   Rate limiting por plano (free: 5/dia, pro: ilimitado)

-   Histórico de prompts usados salvo por ideia

+-----------------------------------------------------------------------+
| // services/ai.service.ts                                             |
|                                                                       |
| export class AIService {                                              |
|                                                                       |
| private gemini: GoogleGenerativeAI                                    |
|                                                                       |
| constructor() {                                                       |
|                                                                       |
| this.gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)     |
|                                                                       |
| }                                                                     |
|                                                                       |
| async generateStream(idea: string, type: OutputType, userId: string)  |
| {                                                                     |
|                                                                       |
| await this.checkRateLimit(userId)                                     |
|                                                                       |
| const prompt = PromptFactory.build(idea, type)                        |
|                                                                       |
| const model = this.gemini.getGenerativeModel({ model:                 |
| \'gemini-2.0-flash\' })                                               |
|                                                                       |
| const result = await model.generateContentStream(prompt)              |
|                                                                       |
| return result.stream                                                  |
|                                                                       |
| }                                                                     |
|                                                                       |
| private async checkRateLimit(userId: string) {                        |
|                                                                       |
| const plan = await BillingService.getUserPlan(userId)                 |
|                                                                       |
| const used = await IdeaService.countTodayIdeas(userId)                |
|                                                                       |
| if (plan === \'free\' && used \>= 5) {                                |
|                                                                       |
| throw new RateLimitError(\'Limite diário atingido. Faça upgrade para  |
| Pro.\')                                                               |
|                                                                       |
| }                                                                     |
|                                                                       |
| }                                                                     |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**5.3 Workspace e Ideias (Content Module)**

-   Criar, editar e deletar workspaces com nome, emoji e descrição

-   Ideias organizadas dentro de workspaces

-   Editor de markdown com preview em tempo real (split view)

-   Toolbar de formatação: H1-H3, bold, italic, lista, código, quote,
    tabela

-   Auto-save a cada 2 segundos de inatividade

-   Busca full-text dentro do workspace

-   Starred ideas --- marcar favoritas

-   Compartilhamento público via slug único (Pro)

-   Histórico de versões --- ver versões anteriores de uma ideia (Pro)

**5.4 Colaboração (Team Module)**

-   Convidar membros para workspace por email

-   Roles: Owner, Editor, Viewer

-   Comentários em ideias (threads)

-   Notificações em tempo real via Supabase Realtime

-   Menções (@usuario) em comentários

**5.5 Exportação (Export Module)**

-   Copiar markdown com um clique

-   Exportar para PDF (gerado no servidor)

-   Exportar para Notion via Notion API (Pro)

-   Exportar para Google Docs via Google API (Pro)

-   Compartilhar link público com preview social (OG tags)

**5.6 Billing e Planos (Billing Module)**

-   Integração completa com Stripe Checkout

-   Plano Free: 5 gerações/dia, 3 workspaces, sem colaboração

-   Plano Pro: ilimitado, todos os outputs, exportação, compartilhamento

-   Plano Team: Pro + colaboração + comentários + roles

-   Webhooks do Stripe processam upgrades/downgrades/cancelamentos

-   Customer Portal do Stripe para gerenciar assinatura

-   Trial de 7 dias no Pro sem cartão

**6. API Routes --- Contrato de Interface**

**6.1 Endpoints**

  ------------ ------------------------ ---------- ---------------------------------------
  **Método**   **Endpoint**             **Auth**   **Descrição**

  POST         /api/ai/generate         ✓          Gera output com IA (streaming)

  GET          /api/ideas               ✓          Lista ideias do usuário (paginado)

  POST         /api/ideas               ✓          Cria nova ideia

  GET          /api/ideas/\[id\]        ✓          Busca ideia por ID

  PATCH        /api/ideas/\[id\]        ✓          Atualiza conteúdo da ideia

  DELETE       /api/ideas/\[id\]        ✓          Deleta ideia

  GET          /api/workspaces          ✓          Lista workspaces do usuário

  POST         /api/workspaces          ✓          Cria workspace

  PATCH        /api/workspaces/\[id\]   ✓          Atualiza workspace

  DELETE       /api/workspaces/\[id\]   ✓          Deleta workspace

  POST         /api/stripe/checkout     ✓          Inicia checkout do Stripe

  POST         /api/stripe/portal       ✓          Abre customer portal

  POST         /api/stripe/webhook      ✗          Webhook do Stripe (assinado)

  POST         /api/export/pdf          ✓          Exporta ideia para PDF

  GET          /api/public/\[slug\]     ✗          Acessa ideia pública
  ------------ ------------------------ ---------- ---------------------------------------

**6.2 Padrão de Resposta**

Todas as rotas seguem um padrão consistente de resposta:

+-----------------------------------------------------------------------+
| // Sucesso                                                            |
|                                                                       |
| { data: T, error: null }                                              |
|                                                                       |
| // Erro                                                               |
|                                                                       |
| { data: null, error: { code: string, message: string, details?:       |
| unknown } }                                                           |
|                                                                       |
| // Exemplos de códigos de erro:                                       |
|                                                                       |
| // UNAUTHORIZED --- usuário não autenticado                           |
|                                                                       |
| // FORBIDDEN --- sem permissão para o recurso                         |
|                                                                       |
| // NOT_FOUND --- recurso não existe                                   |
|                                                                       |
| // RATE_LIMIT --- limite de uso atingido                              |
|                                                                       |
| // VALIDATION_ERROR --- dados inválidos (Zod)                         |
|                                                                       |
| // AI_ERROR --- falha na API do Gemini                                |
|                                                                       |
| // BILLING_ERROR --- problema com pagamento                           |
+-----------------------------------------------------------------------+

**7. Padrões de Código**

**7.1 Convenções**

-   Arquivos: kebab-case (idea-editor.tsx, ai.service.ts)

-   Componentes React: PascalCase (IdeaEditor, WorkspaceCard)

-   Funções e variáveis: camelCase (generateIdea, currentWorkspace)

-   Types e Interfaces: PascalCase prefixado (IIdea, TOutputType)

-   Constants: SCREAMING_SNAKE_CASE (MAX_FREE_IDEAS, STRIPE_PLANS)

-   Enums: PascalCase (OutputType.PRD, UserPlan.PRO)

**7.2 Exemplo de Service (Model)**

+-----------------------------------------------------------------------+
| // services/idea.service.ts                                           |
|                                                                       |
| import { createServerSupabaseClient } from \'@/lib/supabase/server\'  |
|                                                                       |
| import { IdeaSchema } from \'@/lib/validations/idea\'                 |
|                                                                       |
| import type { IIdea, TCreateIdea } from \'@/types/idea\'              |
|                                                                       |
| export class IdeaService {                                            |
|                                                                       |
| static async create(data: TCreateIdea, userId: string):               |
| Promise\<IIdea\> {                                                    |
|                                                                       |
| const validated = IdeaSchema.parse(data) // Zod validation            |
|                                                                       |
| const supabase = createServerSupabaseClient()                         |
|                                                                       |
| const { data: idea, error } = await supabase                          |
|                                                                       |
| .from(\'ideas\')                                                      |
|                                                                       |
| .insert({ \...validated, user_id: userId })                           |
|                                                                       |
| .select()                                                             |
|                                                                       |
| .single()                                                             |
|                                                                       |
| if (error) throw new DatabaseError(error.message)                     |
|                                                                       |
| return idea                                                           |
|                                                                       |
| }                                                                     |
|                                                                       |
| static async countTodayIdeas(userId: string): Promise\<number\> {     |
|                                                                       |
| const today = new Date().toISOString().split(\'T\')\[0\]              |
|                                                                       |
| const { count } = await supabase                                      |
|                                                                       |
| .from(\'ideas\')                                                      |
|                                                                       |
| .select(\'id\', { count: \'exact\' })                                 |
|                                                                       |
| .eq(\'user_id\', userId)                                              |
|                                                                       |
| .gte(\'created_at\', today)                                           |
|                                                                       |
| return count ?? 0                                                     |
|                                                                       |
| }                                                                     |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**7.3 Exemplo de API Route (Controller)**

+-----------------------------------------------------------------------+
| // app/api/ideas/route.ts                                             |
|                                                                       |
| import { NextRequest, NextResponse } from \'next/server\'             |
|                                                                       |
| import { IdeaService } from \'@/services/idea.service\'               |
|                                                                       |
| import { getAuthUser } from \'@/lib/supabase/server\'                 |
|                                                                       |
| import { CreateIdeaSchema } from \'@/lib/validations/idea\'           |
|                                                                       |
| export async function POST(req: NextRequest) {                        |
|                                                                       |
| try {                                                                 |
|                                                                       |
| const user = await getAuthUser(req) // Auth check                     |
|                                                                       |
| if (!user) return unauthorized()                                      |
|                                                                       |
| const body = await req.json()                                         |
|                                                                       |
| const data = CreateIdeaSchema.parse(body) // Validation               |
|                                                                       |
| const idea = await IdeaService.create(data, user.id) // Business      |
| logic                                                                 |
|                                                                       |
| return NextResponse.json({ data: idea, error: null }, { status: 201   |
| })                                                                    |
|                                                                       |
| } catch (err) {                                                       |
|                                                                       |
| return handleError(err) // Error handling                             |
|                                                                       |
| }                                                                     |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**8. Modelo de Negócio**

**8.1 Planos e Preços**

  ---------------------- ----------- ------------------ ------------------
  **Feature**            **Free**    **Pro (\$12/mês)** **Team
                                                        (\$29/mês)**

  Gerações de IA/dia     5           Ilimitado          Ilimitado

  Workspaces             3           Ilimitado          Ilimitado

  Tipos de output        PRD, MVP,   Todos + Custom     Todos + Custom
                         Pitch                          

  Editor de markdown     ✓           ✓                  ✓

  Histórico              30 dias     Permanente         Permanente

  Exportar PDF           ✗           ✓                  ✓

  Export Notion/Docs     ✗           ✓                  ✓

  Compartilhamento       ✗           ✓                  ✓
  público                                               

  Colaboração em         ✗           ✗                  ✓ (até 10 membros)
  workspace                                             

  Comentários e menções  ✗           ✗                  ✓

  API pública            ✗           ✗                  ✓

  Suporte                Community   Email prioritário  Dedicado
  ---------------------- ----------- ------------------ ------------------

**8.2 Projeção de Receita**

+-----------------------------------------------------------------------+
| **📊 Cenário Conservador --- 6 meses**                                |
|                                                                       |
| 500 usuários free → conversão 8% para Pro → 40 pagantes × \$12 =      |
| \$480 MRR. Com crescimento orgânico e 5% para Team: \$480 + \$145 =   |
| \~\$625 MRR. Meta realista de 12 meses: \$5.000 MRR com 350 pagantes. |
+-----------------------------------------------------------------------+

**8.3 Estratégia de Crescimento**

-   Build in public no Twitter/X --- documentar a construção do produto

-   Product Hunt launch --- público-alvo exato

-   Comunidades: Indie Hackers, Reddit r/SideProject, Discord de vibe
    coding

-   SEO: landing pages para \'como fazer PRD\', \'pitch para
    investidor\', etc.

-   Viral loop: ideias públicas com \'Feito com EverMind\' no footer

-   Referral: 1 mês grátis Pro por cada amigo que assinar

**9. Roadmap de Implementação**

**9.1 Ordem de Implementação para o Gemini CLI**

Implemente nesta ordem exata. Cada fase deve estar funcionando e testada
antes de avançar:

  ---------- ------------------------ ---------------------------------------
  **Fase**   **Módulos**              **Critério de conclusão**

  1 --- Base Setup Next.js,           npm run dev sem erros, DB conectado
             TypeScript, Tailwind,    
             Prisma, Supabase         

  2 --- Auth Login Google/GitHub,     Usuário loga e é redirecionado ao
             middleware, profile      dashboard
             creation                 

  3 --- Core AI Service, API Route    Ideia gerada e exibida em markdown
  AI         /generate, streaming, UI 
             básica                   

  4 --- CRUD Workspaces, Ideas,       Usuário cria, edita e lista ideias
             Editor, Auto-save,       
             Histórico                

  5 ---      Stripe Checkout,         Usuário assina Pro e limites mudam
  Billing    Webhook, Portal, Rate    
             limiting                 

  6 ---      PDF, Compartilhamento    Usuário exporta e compartilha ideia
  Export     público, Copy MD         

  7 --- Team Membros, Roles,          Dois usuários editam o mesmo workspace
             Comentários, Realtime    

  8 ---      Analytics, Sentry,       Lighthouse score \> 90, erros
  Polish     Email, SEO, Performance  monitorados
  ---------- ------------------------ ---------------------------------------

**9.2 Instrução Final para o Gemini CLI**

+-----------------------------------------------------------------------+
| **🤖 Como usar este documento**                                       |
|                                                                       |
| Ao iniciar uma sessão de desenvolvimento, cole este documento         |
| completo no contexto do Gemini CLI e diga: \'Vamos implementar a Fase |
| \[N\]. Comece pelo arquivo \[arquivo\]. Siga rigorosamente a          |
| arquitetura definida.\' O Gemini CLI deve implementar um arquivo por  |
| vez, mostrar o código completo, explicar as decisões e aguardar       |
| aprovação antes de avançar.                                           |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| **⚠ Regras inegociáveis**                                             |
|                                                                       |
| 1\. Nunca colocar lógica de negócio em componentes React. 2. Nunca    |
| fazer queries diretas ao banco nas API Routes --- use Services. 3.    |
| Nunca commitar .env.local. 4. Sempre validar inputs com Zod antes de  |
| processar. 5. Sempre tratar erros e retornar o padrão { data, error   |
| }. 6. Sempre tipar com TypeScript --- zero any implícito.             |
+-----------------------------------------------------------------------+

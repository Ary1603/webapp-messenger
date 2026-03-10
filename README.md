# WebApp Messenger

> **Status: Work in Progress** — Core architecture is in place; real-time messaging and several features are actively being developed.

A full-stack, real-time messaging web application built with **Next.js 15**, **Supabase**, and **Clean Architecture** principles. Designed as a portfolio project to demonstrate production-grade engineering practices in a modern TypeScript monorepo.

---

## Overview

WebApp Messenger is a web-based chat application inspired by messaging platforms like WhatsApp and Telegram. It allows users to create accounts, find other users, open direct conversations, and exchange messages through a clean, responsive interface.

The project was built with two goals in mind:

1. **Technical depth** — apply Clean Architecture (hexagonal ports & adapters) to a real product domain, rather than stopping at a tutorial-style CRUD app.
2. **Modern stack fluency** — work hands-on with Next.js App Router (server components, route groups, middleware), Supabase's auth and database features, and scalable state management patterns.

The result is a codebase that prioritizes **maintainability, type safety, and clear layer separation** — qualities that matter in professional engineering teams.

---

## Key Features

### Implemented

- **Authentication** — Secure sign-up and sign-in via Supabase Auth, with session persistence through HTTP-only cookies and automatic token refresh.
- **Protected routing** — Next.js middleware guards all authenticated routes; unauthenticated users are redirected to login automatically.
- **User registration** — Full profile creation (name, username, birthday) backed by a Supabase stored procedure.
- **Chat list** — Authenticated users can view all their active conversations on load.
- **Direct chats** — Get or create a direct message conversation with any other user.
- **Message history** — Cursor-based paginated message loading via a Supabase RPC call, ready for infinite scroll.
- **User & chat search** — Search for users or existing conversations by name or username.
- **Structured error handling** — Namespaced error codes (`AUTH-*`, `CORE-*`, `DB-*`) with a centralized registry and i18n-ready messages.
- **Internationalization** — UI available in English and Spanish via a context-based language provider.
- **Light / dark theme** — System-aware theme toggle powered by `next-themes`.

### In Progress

- Real-time message delivery (Supabase Realtime / WebSocket subscriptions)
- Sending messages end-to-end (UI exists; API route in progress)
- Email confirmation flow
- Online presence indicators
- Read receipts

---

## Tech Stack

| Layer                | Technology                                                                                                      |
| -------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Framework**        | [Next.js 15](https://nextjs.org/) (App Router, Turbopack)                                                       |
| **UI**               | [React 19](https://react.dev/), [Shadcn UI](https://ui.shadcn.com/), [Tailwind CSS 4](https://tailwindcss.com/) |
| **Language**         | [TypeScript 5](https://www.typescriptlang.org/) (strict mode)                                                   |
| **Auth & Database**  | [Supabase](https://supabase.com/) (PostgreSQL + Auth + SSR helpers)                                             |
| **State Management** | [Zustand 5](https://zustand-demo.pmnd.rs/)                                                                      |
| **Validation**       | [Zod 4](https://zod.dev/)                                                                                       |
| **HTTP Client**      | [Axios](https://axios-http.com/) + native `fetch`                                                               |
| **Icons**            | [Lucide React](https://lucide.dev/)                                                                             |
| **Notifications**    | [Sonner](https://sonner.emilkowal.ski/)                                                                         |
| **Date utilities**   | [date-fns](https://date-fns.org/)                                                                               |
| **Linting**          | ESLint 9                                                                                                        |
| **Node requirement** | >= 20                                                                                                           |

---

## Architecture

The project applies **Clean Architecture** (hexagonal ports & adapters) to the server layer, keeping business logic completely decoupled from infrastructure and framework concerns.

```
src/
├── app/                        # Next.js App Router
│   ├── (public)/(auth)/        # Login, register pages
│   ├── (protected)/chats/      # Main chat UI (requires auth)
│   └── api/                    # HTTP API route handlers (delivery layer)
│
├── server/                     # Backend business logic
│   ├── application/            # Use cases + port interfaces
│   │   ├── auth/               # Login, register, logout use cases
│   │   ├── chats/              # Get chats, send message, search use cases
│   │   ├── ports/              # Repository interfaces (AuthRepository, ChatRepository…)
│   │   └── models/             # Shared domain models and output types
│   └── infrastructure/         # Concrete implementations
│       └── supabase/           # Supabase adapters, mappers, RPC calls
│
├── components/                 # React UI components (auth, chats, inputs, cards…)
├── stores/                     # Zustand stores (session, chats)
├── repositories/               # Frontend API client facade
├── contracts/                  # Typed request/response contracts
├── types/                      # Shared TypeScript types (domain, transport, view models)
├── utils/                      # Error mapping, response formatting, parsing
├── hooks/                      # Custom React hooks
└── lib/supabase/               # Supabase client factories + Next.js middleware
```

### Layer responsibilities

| Layer              | Responsibility                                                                   |
| ------------------ | -------------------------------------------------------------------------------- |
| **API Routes**     | Receive HTTP requests, parse input, call use cases, return formatted responses   |
| **Use Cases**      | Orchestrate business logic; return typed `{ success: true/false, data }` outputs |
| **Ports**          | TypeScript interfaces that define what the infrastructure must implement         |
| **Infrastructure** | Supabase-specific implementations; translate Supabase errors into domain errors  |

This structure means the business logic has **zero framework dependencies** — use cases can be unit-tested in isolation without mocking Next.js or Supabase internals.

### API response format

Every API route returns a consistent envelope:

```json
{
  "payload": {
    "meta": {
      "requestId": "uuid",
      "timestamp": "ISO8601",
      "version": "1.0"
    },
    "data": {},
    "errors": []
  }
}
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 20
- A **Supabase** project (free tier is sufficient) with the required tables and stored procedures set up

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/webapp-messenger.git
cd webapp-messenger

# Install dependencies
npm install
```

### Environment variables

Create a `.env.local` file at the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

> The Supabase anon key is intentionally public-facing (it enforces Row Level Security policies server-side). Never put the `service_role` key in a `NEXT_PUBLIC_` variable.

### Running locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app will redirect unauthenticated visitors to `/login` automatically.

---

## Project Status

This project is **actively under development**. The current state represents a functional foundation with authentication, routing, and core data flows working end-to-end. The following areas are the immediate focus:

- Completing the message sending flow (API route + real-time delivery)
- Implementing Supabase Realtime subscriptions for live updates
- Adding registration rollback on profile creation failure

See the [Roadmap](#roadmap) section for the full plan.

---

## Roadmap

### Near-term

- [ ] Complete `send-message` API route
- [ ] Implement Supabase Realtime for live message delivery
- [ ] Implement the email confirmation flow
- [ ] Add rate limiting to auth endpoints
- [ ] Enforce Zod validation inside all route handlers

### Medium-term

- [ ] Frontend pagination for message history (infinite scroll)
- [ ] Optimistic UI updates on message send
- [ ] Online / offline presence indicators
- [ ] Typing indicators
- [ ] Read receipts

### Long-term

- [ ] Group chat support (database schema already supports `chat_type`)
- [ ] Media and file attachments
- [ ] Push / browser notifications
- [ ] Unit and integration test suite
- [ ] CI/CD pipeline

---

## Why This Project Matters

Most portfolio projects demonstrate that a developer can use a framework. This project demonstrates something more specific: **the ability to make deliberate architectural decisions and enforce them consistently across a codebase**.

Applying Clean Architecture to a Next.js App Router project is non-trivial. It requires resolving real tensions — between server components and use cases, between Supabase's opinionated client and a port abstraction, between a flat file structure and a layered one. Navigating those trade-offs and arriving at a coherent, extensible result is what this project is meant to show.

---

## Author

Built by **Adrian Coronado**

- GitHub: [@Ary1603](https://github.com/Ary1603)
- LinkedIn: [linkedin.com/in/adriancoronado-eng/](https://www.linkedin.com/in/adriancoronado-eng/)

---

## License

This project is licensed under the [MIT License](LICENSE).

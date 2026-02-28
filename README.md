# ShaadiSync 💍

**Modern Wedding & Event Planner for South Asian Celebrations**

A comprehensive planning platform built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

---

## Features

- 📋 **Event Management** - Create and manage multiple wedding events
- 👥 **Guest Lists** - Import/export guests, track dietary restrictions
- 📬 **RSVP System** - Public RSVP links with real-time updates
- 💰 **Budget Tracker** - Track estimated vs actual costs
- 📅 **Timeline Builder** - Day-of schedule with time slots
- ✅ **Planning Checklist** - Pre-built templates with task assignments
- 🏢 **Vendor Directory** - Browse and hire vendors
- 👨‍👩‍👧 **Collaboration** - Invite family members with role-based permissions

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (Email + Google OAuth)
- **Storage:** Supabase Storage
- **Deployment:** Vercel

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Vercel account (for deployment)

### 1. Clone the Repository

```bash
git clone https://github.com/claudetest147-hub/shaadisync.git
cd shaadisync
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

Follow the detailed instructions in **[SUPABASE_CONFIG.md](./SUPABASE_CONFIG.md)** to:
- Create your Supabase project
- Execute the database schema
- Enable authentication providers
- Set up storage and realtime

### 4. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
shaadisync/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── (public)/          # Public pages (landing, vendors, RSVP)
│   └── (dashboard)/       # Protected dashboard pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Feature-specific components
├── lib/                   # Utilities and configurations
│   ├── supabase/         # Supabase client & types
│   ├── hooks/            # Custom React hooks
│   └── actions/          # Server actions
├── schema.sql            # Database schema
├── SPEC.md              # Technical specification
└── SUPABASE_CONFIG.md   # Supabase setup guide
```

---

## Documentation

- **[SPEC.md](./SPEC.md)** - Complete technical specification with:
  - Feature list
  - Database schema (ER diagram)
  - API endpoints
  - Component architecture
  
- **[SUPABASE_CONFIG.md](./SUPABASE_CONFIG.md)** - Step-by-step Supabase setup

---

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables (from `.env.local`)
5. Deploy!

Vercel will automatically deploy on every push to `main`.

---

## Contributing

This is currently a personal project, but contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

MIT License - see [LICENSE](./LICENSE) for details.

---

## Support

For issues and questions:
- Open an issue on GitHub
- Email: support@shaadisync.com (coming soon)

---

Built with ❤️ by PM Code Sprint

# JobFlow 🚀

**A modern Job Application Tracker** built with Next.js 15, TypeScript & Tailwind CSS.

Track every job you apply to — from wishlist → applied → interview → offer/rejected — in a clean Kanban board or list view.

## ✨ Features

- **Kanban Board + List View** — switch between pipeline board and card list
- **Full CRUD** — Add, edit, delete applications
- **Status Pipeline** — Wishlist → Applied → Interview → Offer → Rejected
- **Search & Filters** — Instantly filter by company, role, location or status
- **Stats Dashboard** — Live counts for every stage
- **Local Storage** — Data persists in your browser (no backend needed)
- **Demo Data** — One-click sample applications to explore the UI
- **Fully Responsive** — Looks great on mobile & desktop
- **Dark Mode** — Automatically follows system preference
- **Zero Config Deploy** — Works perfectly on Vercel

## 🛠️ Tech Stack

| Technology     | Purpose                  |
|----------------|--------------------------|
| Next.js 15     | React framework (App Router) |
| TypeScript     | Type safety              |
| Tailwind CSS 4 | Styling                  |
| LocalStorage   | Client-side persistence  |

## 🚀 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/arzeenazees14/jobflow.git
cd jobflow

# 2. Install dependencies
npm install

# 3. Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Deploy to Vercel (1 click)

1. Push this repo to your GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the `jobflow` repository
4. Click **Deploy**

That’s it — your live app is ready in under 2 minutes.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout + metadata
│   ├── page.tsx        # Main dashboard (client component)
│   └── globals.css
├── components/
│   ├── StatsCards.tsx  # Dashboard statistics
│   ├── JobCard.tsx     # Individual job card
│   └── JobFormModal.tsx# Add / Edit form
├── lib/
│   └── storage.ts      # localStorage helpers
└── types/
    └── job.ts          # TypeScript types + status config
```

## 🎯 Why this project is good for your resume

- Shows you can build a **complete, production-ready UI**
- Demonstrates **TypeScript**, modern React patterns (`useState`, `useEffect`, `useMemo`)
- Clean component architecture & separation of concerns
- Real-world problem (job search tracking)
- Easy to extend later with:
  - Supabase / Prisma + Postgres (real database)
  - NextAuth / Clerk (authentication)
  - Charts (Recharts)
  - Email reminders
  - AI resume suggestions

## 🔮 Future Improvements (good talking points in interviews)

- [ ] User authentication
- [ ] Cloud database (Supabase / Neon)
- [ ] Export to CSV / PDF
- [ ] Interview calendar integration
- [ ] AI-powered application tips

---

Built with ❤️ for job seekers.  
Feel free to fork, star, and customize!

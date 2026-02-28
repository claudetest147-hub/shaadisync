# ShaadiSync Deployment Guide

## ✅ Completed Setup

The following has been completed programmatically via Supabase CLI and Management API:

- ✅ Supabase project created: `drxyioikyrcfkhhbfnne`
- ✅ Database schema pushed (10 tables with RLS policies)
- ✅ Realtime enabled on: `rsvps`, `guests`, `checklist_items`, `timeline_items`
- ✅ Storage bucket created: `event-images` (public read, authenticated write)
- ✅ Storage policies configured
- ✅ `.env.local` created with credentials
- ✅ Code committed and pushed to GitHub

---

## 🔧 Remaining Manual Steps

### 1. Google OAuth Setup (Optional but Recommended)

**Step 1: Google Cloud Console**
1. Go to https://console.cloud.google.com/
2. Create a new project or select existing: **"ShaadiSync"**
3. Enable **Google+ API**
4. Navigate to **APIs & Services** → **Credentials**
5. Click **"Create Credentials"** → **OAuth 2.0 Client ID**
6. Application type: **Web application**
7. Name: `ShaadiSync Production`
8. **Authorized redirect URIs:**
   ```
   https://drxyioikyrcfkhhbfnne.supabase.co/auth/v1/callback
   ```
9. Click **"Create"**
10. Copy the **Client ID** and **Client Secret**

**Step 2: Supabase Dashboard**
1. Go to https://supabase.com/dashboard/project/drxyioikyrcfkhhbfnne
2. Navigate to **Authentication** → **Providers**
3. Find **"Google"** and click to expand
4. Enable it
5. Paste the **Client ID**
6. Paste the **Client Secret**
7. Click **"Save"**

**Note:** Email/Password auth is already enabled by default in Supabase.

---

### 2. Vercel Deployment

**Option A: Via Vercel Dashboard (Recommended)**

1. Go to https://vercel.com/new
2. Import your repository: `claudetest147-hub/shaadisync`
3. Configure project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./`
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
4. Add **Environment Variables:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://drxyioikyrcfkhhbfnne.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyeHlpb2lreXJjZmtoaGJmbm5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyNTI5ODksImV4cCI6MjA4NzgyODk4OX0.NdunMLpWN45nQVlbJ-nwdZqIUBEbbHhVEg-eQcBIEhE
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyeHlpb2lreXJjZmtoaGJmbm5lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjI1Mjk4OSwiZXhwIjoyMDg3ODI4OTg5fQ.I9Vnro0ycs4uXUXufDpv6D0iobll3SN5EMU3i5DvZaA
   NEXT_PUBLIC_APP_URL=https://your-vercel-deployment.vercel.app
   ```
   (Replace `NEXT_PUBLIC_APP_URL` after deployment with actual URL)
5. Click **"Deploy"**
6. Wait for deployment to complete
7. **Update** the `NEXT_PUBLIC_APP_URL` env var with the actual production URL
8. **Redeploy** (Settings → Redeploy)

**Option B: Via Vercel CLI**

```bash
# Login to Vercel
vercel login

# Navigate to project
cd shaadisync

# Link to Vercel (creates new project)
vercel link

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add NEXT_PUBLIC_APP_URL production

# Deploy
vercel --prod
```

**Auto-Deploy:** Once linked, every push to `main` branch will automatically deploy to production.

---

### 3. Post-Deployment Configuration

After Vercel deployment:

1. **Update App URL:**
   - Copy your production URL from Vercel (e.g., `https://shaadisync.vercel.app`)
   - Update `NEXT_PUBLIC_APP_URL` in Vercel environment variables
   - Redeploy if needed

2. **Update Google OAuth (if configured):**
   - Add production callback URL to Google Cloud Console:
     ```
     https://drxyioikyrcfkhhbfnne.supabase.co/auth/v1/callback
     ```
   - This should already be set if you followed step 1

3. **Test Authentication:**
   - Visit your deployed app
   - Try signing up with email/password
   - Try signing in with Google OAuth (if configured)
   - Verify profile is created in Supabase Dashboard

4. **Test Storage:**
   - Create a test event
   - Try uploading a cover image
   - Verify image appears in Storage bucket in Supabase Dashboard

---

## 📊 Project Status

**Supabase:**
- Project: https://supabase.com/dashboard/project/drxyioikyrcfkhhbfnne
- Project Ref: `drxyioikyrcfkhhbfnne`
- Region: `us-east-1`
- Status: ✅ Active & Healthy

**Database:**
- ✅ 10 tables created with RLS
- ✅ Realtime enabled on 4 tables
- ✅ Triggers and functions configured

**Storage:**
- ✅ Bucket: `event-images` (public)
- ✅ Policies: configured for auth users

**GitHub:**
- Repo: https://github.com/claudetest147-hub/shaadisync
- Latest commit: Supabase setup complete

**Next:**
- ⏳ Configure Google OAuth (optional)
- ⏳ Deploy to Vercel
- ⏳ Start building UI

---

## 🔐 Credentials Reference

**Supabase:**
```
Project URL: https://drxyioikyrcfkhhbfnne.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Service Role Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Database Password: vr356G8zlJtyVALQLlgSXRDW5VZXIBvM
```

**GitHub:**
```
Repo: claudetest147-hub/shaadisync
```

---

## 🚀 Ready for Builder

Everything is set up for frontend development to begin:
- Database schema is live
- API structure is documented in SPEC.md
- Environment variables are ready
- Storage is configured

**@Builder** can start building:
1. Supabase client setup (`lib/supabase/client.ts`)
2. Auth pages (login/signup)
3. Dashboard layout
4. Event creation flow

See `SPEC.md` for complete technical specification.

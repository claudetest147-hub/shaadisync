# Supabase Configuration Guide

Follow these steps to set up your Supabase project for ShaadiSync.

---

## 1. Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click **"New project"**
3. Organization: Create new organization **"shaadisync"** (or use existing)
4. Project settings:
   - **Name:** `shaadisync`
   - **Database Password:** (generate strong password, save it securely)
   - **Region:** Choose closest to your target users
   - **Pricing Plan:** Free tier is fine to start
5. Click **"Create new project"**
6. Wait 2-3 minutes for project to provision

---

## 2. Execute Database Schema

1. In Supabase Dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy the entire contents of `schema.sql` from this repo
4. Paste into the SQL editor
5. Click **"Run"** (or Cmd/Ctrl + Enter)
6. Verify no errors appear
7. Check **Table Editor** to confirm tables were created:
   - profiles
   - events
   - event_members
   - guests
   - rsvps
   - vendors
   - event_vendors
   - budget_items
   - timeline_items
   - checklist_items

---

## 3. Enable Authentication

### 3.1 Enable Email/Password Auth

1. Go to **Authentication** → **Providers** (left sidebar)
2. Find **"Email"** in the provider list
3. Ensure it's **Enabled** (should be by default)
4. Settings:
   - ✅ Enable email confirmations
   - ✅ Enable email change confirmations
   - ✅ Secure password change

### 3.2 Enable Google OAuth

1. Still in **Authentication** → **Providers**
2. Find **"Google"** in the provider list
3. Click **"Enable"**
4. You'll need to set up Google OAuth credentials:

**Google Cloud Console Setup:**
1. Go to https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Enable **Google+ API**
4. Go to **APIs & Services** → **Credentials**
5. Click **"Create Credentials"** → **OAuth 2.0 Client ID**
6. Application type: **Web application**
7. Name: `ShaadiSync`
8. Authorized redirect URIs:
   ```
   https://<your-supabase-project-ref>.supabase.co/auth/v1/callback
   ```
   (Get your project ref from Supabase Dashboard → Settings → General)
9. Click **"Create"**
10. Copy **Client ID** and **Client Secret**

**Back in Supabase:**
1. Paste **Client ID** into Supabase Google provider settings
2. Paste **Client Secret**
3. Click **"Save"**

---

## 4. Enable Realtime

1. Go to **Database** → **Replication** (left sidebar)
2. Find these tables and enable **Realtime** for each:
   - `rsvps` (most important for live RSVP updates)
   - `guests`
   - `checklist_items`
   - `timeline_items`
3. Click the toggle to enable for each table

**Note:** The schema already includes the SQL command to add these to the realtime publication, but double-check in the UI.

---

## 5. Create Storage Bucket

### 5.1 Create Bucket

1. Go to **Storage** (left sidebar)
2. Click **"Create a new bucket"**
3. Bucket settings:
   - **Name:** `event-images`
   - **Public bucket:** ✅ Yes (so images can be viewed without auth)
   - **File size limit:** 5MB
   - **Allowed MIME types:** `image/*`
4. Click **"Create bucket"**

### 5.2 Set Storage Policies

1. Click on the `event-images` bucket
2. Go to **Policies** tab
3. Click **"New policy"**

**Policy 1: Public read access**
```sql
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'event-images');
```

**Policy 2: Authenticated users can upload**
```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'event-images' AND
  auth.role() = 'authenticated'
);
```

**Policy 3: Users can update own uploads**
```sql
CREATE POLICY "Users can update own uploads"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'event-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

**Policy 4: Users can delete own uploads**
```sql
CREATE POLICY "Users can delete own uploads"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'event-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

**Alternative:** You can use the policy template builder in Supabase UI:
1. Click **"New policy"** → **"For full customization"**
2. Policy name: `Public read access`
3. Target roles: `public`
4. Operations: `SELECT`
5. Definition: `bucket_id = 'event-images'`
6. Repeat for other policies

---

## 6. Get Environment Variables

1. Go to **Settings** → **API** (left sidebar)
2. Copy these values:

```env
# Project URL
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co

# Anon (public) key
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Service role key (keep secret!)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

3. Create `.env.local` in your project root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Add to Vercel** (for deployment):
   - Go to your Vercel project settings
   - Navigate to **Environment Variables**
   - Add each variable above
   - Make sure to add them for **Production**, **Preview**, and **Development** environments

---

## 7. (Optional) Set Up Edge Function for Public RSVP

**Note:** This is optional initially. You can use regular API routes first, and add edge functions later for better performance.

If you want to deploy the edge function now:

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Link to your project:
   ```bash
   cd shaadisync
   supabase link --project-ref <your-project-ref>
   ```

3. Create the edge function:
   ```bash
   supabase functions new rsvp-public
   ```

4. Edit `supabase/functions/rsvp-public/index.ts` (see SPEC.md for code)

5. Deploy:
   ```bash
   supabase functions deploy rsvp-public --no-verify-jwt
   ```

6. The function will be available at:
   ```
   https://<your-project-ref>.supabase.co/functions/v1/rsvp-public
   ```

---

## 8. Verify Setup

### Test Database Connection

Run this in SQL Editor:
```sql
SELECT COUNT(*) FROM profiles;
```
Should return `0` (no profiles yet, but table exists).

### Test Auth

Try signing up a test user:
1. Use the built-in Auth UI in Supabase Dashboard
2. Or test via your Next.js app once it's running

### Test Storage

Try uploading an image via the Supabase Dashboard:
1. Go to Storage → `event-images`
2. Click **"Upload file"**
3. Upload a test image
4. Verify you can view it (public URL should work)

---

## 9. Add to Vercel

1. Go to https://vercel.com/new
2. Import repository: `claudetest147-hub/shaadisync`
3. **Environment Variables:** Add the four variables from step 6
4. **Framework Preset:** Next.js (should auto-detect)
5. Click **"Deploy"**
6. Wait for deployment
7. Copy the production URL (e.g., `https://shaadisync.vercel.app`)
8. Update `NEXT_PUBLIC_APP_URL` in Vercel env vars to use the production URL

### Enable Auto-Deploy

Vercel automatically deploys:
- **Production:** Every push to `main` branch
- **Preview:** Every push to other branches / PRs

You can customize this in **Settings** → **Git** if needed.

---

## 10. Post-Setup Checklist

- [ ] Supabase project created
- [ ] Database schema executed successfully
- [ ] Email/Password auth enabled
- [ ] Google OAuth configured
- [ ] Realtime enabled on key tables
- [ ] Storage bucket `event-images` created with policies
- [ ] Environment variables copied to `.env.local`
- [ ] Environment variables added to Vercel
- [ ] Vercel deployment successful
- [ ] Test user sign-up works
- [ ] Test image upload works

---

## Troubleshooting

### Database schema errors
- Make sure you're using the latest PostgreSQL version in Supabase (14+)
- Run the schema in chunks if you get timeout errors
- Check for typos in foreign key references

### Auth not working
- Verify email confirmations are disabled for testing (or check your email)
- Check that redirect URLs are configured correctly
- Clear browser cache/cookies

### Storage upload fails
- Verify bucket is public
- Check that policies are created correctly
- Test with a small image first (&lt;1MB)

### Realtime not working
- Verify tables are added to `supabase_realtime` publication
- Check browser console for connection errors
- Ensure anon key has correct permissions

---

**All done!** You're ready to start building. 🚀

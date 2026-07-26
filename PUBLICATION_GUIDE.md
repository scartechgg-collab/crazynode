# CrazyNode Production, Supabase, Admin & SEO Guide

## 1. Architecture

CrazyNode now uses Supabase as the production source of truth:

- **Authentication:** Supabase Auth for normal users and the administrator.
- **Administrator:** the existing verified Supabase user `root@crazynode.in`.
- **Passwords:** managed only by Supabase Auth. No password, default password, password hash, or service-role key is stored in this repository.
- **CMS database:** `public.site_settings` in Supabase stores JSON for hero games, banners, prices, descriptions, Minecraft processors/plans, VPS categories/plans, Discord Bot plans, announcements, branding, and locations.
- **Security:** Supabase Row Level Security permits public reads and restricts writes to the authenticated admin email.
- **Audit:** every CMS insert/update/delete is copied to `site_settings_audit`.

## 2. Required Supabase Setup

1. Open Supabase Dashboard for project `gkfeplrnllxfroqvpwfw`.
2. Go to **SQL Editor → New query**.
3. Paste and run the complete `SUPABASE_SETUP.sql` file in this repository.
4. Go to **Authentication → Users** and confirm `root@crazynode.in` exists.
5. Do not add the admin password to source code or SQL.
6. Go to **Authentication → URL Configuration** and configure:
   - Site URL: `https://crazynode.in`
   - Redirect URLs:
     - `https://crazynode.in/login?confirmed=1`
     - `https://crazynode.in/update-password`
     - `http://localhost:3000/login?confirmed=1`
     - `http://localhost:3000/update-password`
7. In **Authentication → Providers → Email**, choose whether email confirmation is required for new users.

## 3. Environment Variables

Configure these in Vercel/hosting settings (and `.env.local` locally):

```env
NEXT_PUBLIC_SUPABASE_URL=https://gkfeplrnllxfroqvpwfw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
SUPABASE_URL=https://gkfeplrnllxfroqvpwfw.supabase.co
SUPABASE_ANON_KEY=your-public-anon-key
SUPABASE_ADMIN_EMAIL=root@crazynode.in
```

The anon key is intended for browser use and is safe only because RLS is enabled. **Never expose a Supabase `service_role` key and never prefix it with `NEXT_PUBLIC_`.**

## 4. Authentication Routes

### Users

- `/register` → Supabase `signUp`; profile is created automatically by SQL trigger.
- `/login` → Supabase `signInWithPassword`.
- `/forgot-password` → Supabase recovery email.
- `/update-password` → handles recovery session and updates the password through Supabase.
- `/dashboard` → validates the Supabase access-token cookie.
- `/api/auth/logout` → signs out and clears secure cookies.

### Administrator

- `/admin/login` → signs into Supabase and only accepts the configured admin email.
- `/admin/dashboard` → CMS control center.
- `/api/admin/me` → validates the Supabase user and admin email.
- Admin password is the password already assigned to the user in Supabase Authentication.

## 5. CMS / Admin Dashboard

Admin dashboard controls:

- Hero titles, slugs, descriptions, prices and banner URLs.
- Announcement enable/disable, type and text.
- Minecraft CPU categories and every tier's name, price, RAM, storage and CPU allocation.
- VPS processor categories and plans.
- Discord Bot plans.
- Company name, logo and email.
- Locations data (API supports a `locations` JSON key; expand UI as needed).

Public frontend components request `/api/content/[key]`. When no Supabase row has been saved yet, the API serves code defaults. On first admin save, the full JSON is persisted to Supabase.

## 6. Deploy to Vercel

1. Push the repository to GitHub.
2. Import it at `vercel.com/new`.
3. Set all environment variables listed above.
4. Deploy.
5. Add `crazynode.in` under **Project → Settings → Domains**.
6. Add Vercel's requested DNS records at your registrar.
7. Add both production and preview callback URLs in Supabase Authentication URL Configuration.

Build commands:

```bash
npm install
npm run build
```

## 7. Google / Chrome Search Publication

1. Open `https://search.google.com/search-console`.
2. Add a **Domain property** for `crazynode.in`.
3. Add Google's TXT verification record to DNS.
4. After verification, submit:
   - `https://crazynode.in/sitemap.xml`
5. Use **URL Inspection** to request indexing for:
   - `/`
   - `/minecraft`
   - `/vps`
   - `/discord-bot`
   - `/game-server-hosting`
6. Monitor **Pages**, **Core Web Vitals**, and **Enhancements**.
7. Also import the property into Bing Webmaster Tools.

Generated SEO assets:

- `/sitemap.xml`
- `/robots.txt`
- `/manifest.webmanifest`
- Open Graph and Twitter metadata
- Organization and WebSite JSON-LD schemas

Replace the placeholder Google verification value in `src/app/layout.tsx` with the code supplied by Search Console.

## 8. Production Security Checklist

- [x] No password or password hash in source.
- [x] No service-role key in source.
- [x] Admin identity verified through Supabase Auth.
- [x] Public CMS reads protected by RLS.
- [x] CMS writes restricted to admin email through RLS.
- [x] Admin and API routes excluded from search indexing.
- [x] httpOnly, SameSite cookies for access/refresh tokens.
- [ ] Enable CAPTCHA and rate limits for production sign-up/login.
- [ ] Enable SMTP in Supabase for branded confirmation and recovery emails.
- [ ] Rotate the anon key only if it was unintentionally paired with unsafe RLS policies.

## 9. Testing

After running `SUPABASE_SETUP.sql`:

1. Create a normal user at `/register`.
2. Confirm email (if enabled), then login.
3. Login at `/admin/login` with the existing Supabase admin account.
4. Change a hero title and save.
5. Reload the homepage and verify the new title appears.
6. Check Supabase `site_settings` and `site_settings_audit` tables.
7. Test password recovery and the `/update-password` page.

© 2026 CrazyNode.

# Supabase setup

1. Create a Supabase project.
2. Open **SQL Editor** and run `supabase-schema.sql`.
3. In **Authentication > Users**, create the admin email and password.
4. Copy that user's UUID, then run this in SQL Editor:

```sql
insert into public.admin_users (user_id)
values ('PASTE_AUTH_USER_UUID_HERE');
```

5. In Vercel Project Settings > Environment Variables, add these for Production and Preview:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-anon-key
```

The publishable/anon key is safe for the browser. Never put the Supabase service-role key in Vite variables or source code.

6. Redeploy Vercel.
7. Open `/admin` through the website footer and sign in with the Supabase admin user.

The contact form inserts leads into `submissions` using the public insert policy. Admin users can read and update those leads. Page and site settings are publicly readable so the public site can use them for SEO, while only `admin_users` can edit them.

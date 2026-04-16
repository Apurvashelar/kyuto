-- ============================================================================
-- Kyuto — Supabase schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query → paste)
-- ============================================================================

-- Helpful extension for gen_random_uuid()
create extension if not exists "pgcrypto";

-- ============================================================================
-- addresses
-- ============================================================================
create table if not exists public.addresses (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  full_name   text not null,
  phone       text not null,
  line1       text not null,
  line2       text,
  city        text not null,
  state       text not null,
  pincode     text not null,
  is_default  boolean not null default false,
  created_at  timestamptz not null default now()
);
create index if not exists addresses_user_id_idx on public.addresses(user_id);

alter table public.addresses enable row level security;

drop policy if exists "own addresses — read"   on public.addresses;
drop policy if exists "own addresses — insert" on public.addresses;
drop policy if exists "own addresses — update" on public.addresses;
drop policy if exists "own addresses — delete" on public.addresses;

create policy "own addresses — read"   on public.addresses for select using (auth.uid() = user_id);
create policy "own addresses — insert" on public.addresses for insert with check (auth.uid() = user_id);
create policy "own addresses — update" on public.addresses for update using (auth.uid() = user_id);
create policy "own addresses — delete" on public.addresses for delete using (auth.uid() = user_id);

-- ============================================================================
-- orders
-- ============================================================================
create table if not exists public.orders (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users(id) on delete cascade,
  status             text not null default 'pending',         -- pending | paid | failed | shipped | delivered | cancelled
  total              numeric(10,2) not null default 0,
  subtotal           numeric(10,2) not null default 0,
  discount           numeric(10,2) not null default 0,
  shipping           numeric(10,2) not null default 0,
  items_count        int not null default 0,
  coupon_code        text,
  shipping_addr      jsonb,
  razorpay_order_id  text,
  payment_id         text,
  created_at         timestamptz not null default now()
);
create index if not exists orders_user_id_idx on public.orders(user_id);

-- Add razorpay_order_id if upgrading an older schema
alter table public.orders
  add column if not exists razorpay_order_id text;

alter table public.orders enable row level security;

drop policy if exists "own orders — read"   on public.orders;
drop policy if exists "own orders — insert" on public.orders;

create policy "own orders — read"   on public.orders for select using (auth.uid() = user_id);
create policy "own orders — insert" on public.orders for insert with check (auth.uid() = user_id);

-- ============================================================================
-- order_items
-- ============================================================================
create table if not exists public.order_items (
  id           uuid primary key default gen_random_uuid(),
  order_id     uuid not null references public.orders(id) on delete cascade,
  product_id   text not null,
  product_name text not null,
  image        text,
  quantity     int not null default 1,
  price        numeric(10,2) not null
);
create index if not exists order_items_order_id_idx on public.order_items(order_id);

alter table public.order_items enable row level security;

drop policy if exists "order items — read" on public.order_items;

create policy "order items — read" on public.order_items
  for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id and o.user_id = auth.uid()
    )
  );

-- ============================================================================
-- wishlist
-- ============================================================================
create table if not exists public.wishlist (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  product_id  text not null,
  created_at  timestamptz not null default now(),
  unique (user_id, product_id)
);
create index if not exists wishlist_user_id_idx on public.wishlist(user_id);

alter table public.wishlist enable row level security;

drop policy if exists "own wishlist — read"   on public.wishlist;
drop policy if exists "own wishlist — insert" on public.wishlist;
drop policy if exists "own wishlist — delete" on public.wishlist;

create policy "own wishlist — read"   on public.wishlist for select using (auth.uid() = user_id);
create policy "own wishlist — insert" on public.wishlist for insert with check (auth.uid() = user_id);
create policy "own wishlist — delete" on public.wishlist for delete using (auth.uid() = user_id);

-- ============================================================================
-- notify_requests  (restock / sale alerts)
-- ============================================================================
create table if not exists public.notify_requests (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  product_id  text not null,
  type        text not null default 'restock', -- restock | sale
  notified_at timestamptz,
  created_at  timestamptz not null default now(),
  unique (email, product_id, type)
);

alter table public.notify_requests enable row level security;
-- No client-facing policies — writes happen server-side with the service role key.

-- ============================================================================
-- contact_submissions
-- ============================================================================
create table if not exists public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  subject     text not null default 'General',
  message     text not null,
  created_at  timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;
-- Server-side only.

-- ============================================================================
-- corporate_enquiries
-- ============================================================================
create table if not exists public.corporate_enquiries (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  company     text not null,
  email       text not null,
  phone       text not null,
  quantity    text,
  occasion    text not null,
  budget      text,
  notes       text,
  created_at  timestamptz not null default now()
);

alter table public.corporate_enquiries enable row level security;
-- Server-side only.

-- ============================================================================
-- products
-- ============================================================================
create table if not exists public.products (
  id                   text primary key,              -- e.g. 'p-rose-bloom'
  slug                 text not null unique,
  name                 text not null,
  tagline              text not null default '',
  description          text not null default '',
  price                numeric(10,2) not null,
  compare_price        numeric(10,2),
  images               jsonb not null default '[]'::jsonb,   -- string[] of Cloudinary URLs
  category             text not null,
  collections          jsonb not null default '[]'::jsonb,   -- string[]
  attributes           jsonb not null default '{}'::jsonb,   -- { fragrance, colour, mood, material, size, weight }
  stock                int not null default 0,
  is_featured          boolean not null default false,
  is_new_launch        boolean not null default false,
  is_bestseller        boolean not null default false,
  gift_wrap_available  boolean not null default false,
  sort_order           int not null default 0,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);
create index if not exists products_category_idx    on public.products(category);
create index if not exists products_sort_order_idx  on public.products(sort_order);

-- Reviews stored inline as jsonb array of { id, author, rating, title, body, verified, date }
alter table public.products
  add column if not exists reviews jsonb not null default '[]'::jsonb;

alter table public.products enable row level security;

drop policy if exists "products — public read" on public.products;
create policy "products — public read" on public.products for select using (true);
-- Writes are service-role only via /api/admin/products.

-- ============================================================================
-- product_reviews
-- ============================================================================
create table if not exists public.product_reviews (
  id          uuid primary key default gen_random_uuid(),
  product_id  text not null references public.products(id) on delete cascade,
  author      text not null,
  rating      int not null check (rating between 1 and 5),
  title       text,
  body        text not null,
  verified    boolean not null default false,
  created_at  timestamptz not null default now()
);
create index if not exists product_reviews_product_id_idx on public.product_reviews(product_id);

alter table public.product_reviews enable row level security;

drop policy if exists "product reviews — public read" on public.product_reviews;
create policy "product reviews — public read" on public.product_reviews for select using (true);
-- Writes are service-role only.

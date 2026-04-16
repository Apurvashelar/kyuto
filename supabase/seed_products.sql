-- ============================================================================
-- Kyuto — seed existing mock products into the products table
-- Run this AFTER schema.sql (Dashboard → SQL Editor → paste → Run).
-- Safe to re-run: uses ON CONFLICT to upsert.
-- Replace image URLs with Cloudinary ones via /admin/products once you upload.
-- ============================================================================

insert into public.products
  (id, slug, name, tagline, description, price, compare_price, images, category, collections, attributes, stock, is_featured, is_new_launch, is_bestseller, gift_wrap_available, sort_order)
values
  (
    'p-rose-bloom', 'rose-bloom-candle', 'Rose Bloom Candle',
    'Soft florals, slow evenings',
    'A hand-poured soy wax candle blending fresh rose petals, vanilla musk, and a whisper of sandalwood. Burn time 40+ hours.',
    899, 1199,
    '["https://images.unsplash.com/photo-1602874801006-e26c7f1063c1?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1607348063933-4c2c1f2ff069?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    'candles',
    '["gifting","new-arrivals","sale"]'::jsonb,
    '{"fragrance":"Rose & Vanilla","colour":"Blush Pink","mood":"Romantic","material":"Soy wax","size":"200g"}'::jsonb,
    12, true, true, true, true, 10
  ),
  (
    'p-lavender-haze', 'lavender-haze-candle', 'Lavender Haze Candle',
    'Quiet mornings, softer nights',
    'Calming French lavender with a touch of eucalyptus — ideal for reading corners and warm baths.',
    749, null,
    '["https://images.unsplash.com/photo-1602874801006-e26c7f1063c1?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    'candles',
    '["minimal-home","gifting"]'::jsonb,
    '{"fragrance":"Lavender & Eucalyptus","colour":"Lavender","mood":"Calm","material":"Soy wax","size":"200g"}'::jsonb,
    8, false, false, true, true, 20
  ),
  (
    'p-vanilla-sandal', 'vanilla-sandal-candle', 'Vanilla Sandalwood Candle',
    'Warm, woody, grounded',
    'A rich blend of French vanilla and Mysore sandalwood — our most-gifted candle.',
    999, null,
    '["https://images.unsplash.com/photo-1607348063933-4c2c1f2ff069?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    'candles',
    '["gifting","diwali"]'::jsonb,
    '{"fragrance":"Vanilla & Sandalwood","colour":"Ivory","mood":"Cozy","material":"Soy wax","size":"250g"}'::jsonb,
    0, false, false, true, true, 30
  ),
  (
    'p-blush-mug', 'blush-ceramic-mug', 'Blush Ceramic Mug',
    'Your new 7am ritual',
    'A hand-glazed ceramic mug in a soft blush pink with a matte finish. Dishwasher safe.',
    499, 649,
    '["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1570649980020-3946cd2ba9a7?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    'mugs',
    '["minimal-home","sale"]'::jsonb,
    '{"colour":"Blush","material":"Stoneware","size":"300ml"}'::jsonb,
    24, true, true, false, true, 40
  ),
  (
    'p-lilac-mug', 'lilac-dream-mug', 'Lilac Dream Mug',
    'Soft purple, soft mornings',
    'A dreamy lilac hue on smooth glazed stoneware. Pairs with our Lilac Saucer set.',
    549, null,
    '["https://images.unsplash.com/photo-1570649980020-3946cd2ba9a7?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    'mugs',
    '["minimal-home","new-arrivals"]'::jsonb,
    '{"colour":"Lilac","material":"Stoneware","size":"320ml"}'::jsonb,
    15, false, true, false, true, 50
  ),
  (
    'p-ivory-cupsaucer', 'ivory-cup-saucer-set', 'Ivory Cup & Saucer Set',
    'Afternoon tea, elevated',
    'A delicate cup and saucer pairing in ivory with hand-painted gold trim. Set of 2.',
    1499, 1799,
    '["https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    'cup-saucer',
    '["gifting","sale"]'::jsonb,
    '{"colour":"Ivory & Gold","material":"Porcelain","size":"200ml cup"}'::jsonb,
    6, false, false, true, true, 60
  ),
  (
    'p-peach-teapot', 'peach-ceramic-teapot', 'Peach Ceramic Teapot',
    'Brewed with grace',
    'A minimalist peach teapot with a bamboo handle. Holds 800ml — enough for two generous cups.',
    1999, null,
    '["https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    'tea-pots',
    '["minimal-home","gifting"]'::jsonb,
    '{"colour":"Peach","material":"Stoneware","size":"800ml"}'::jsonb,
    4, true, false, false, true, 70
  ),
  (
    'p-mint-bowl', 'mint-serving-bowl', 'Mint Serving Bowl',
    'Serve in style',
    'A handmade ceramic bowl in sage-mint, perfect for fruit, salads, or ramen.',
    699, null,
    '["https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1556909114-44e3e70034e2?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    'bowls',
    '["minimal-home"]'::jsonb,
    '{"colour":"Mint","material":"Stoneware","size":"Medium"}'::jsonb,
    18, false, false, false, true, 80
  ),
  (
    'p-mauve-bowl', 'mauve-ramen-bowl', 'Mauve Ramen Bowl',
    'Big bowl energy',
    'A deep, wide bowl in dusty mauve for ramen, soups, or beautiful breakfasts.',
    849, null,
    '["https://images.unsplash.com/photo-1556909114-44e3e70034e2?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    'bowls',
    '["new-arrivals"]'::jsonb,
    '{"colour":"Mauve","material":"Stoneware","size":"Large"}'::jsonb,
    11, false, true, false, true, 90
  ),
  (
    'p-diwali-hamper', 'diwali-glow-hamper', 'Diwali Glow Hamper',
    'Festive, folded, gifted',
    'Includes two candles, a pair of diya holders, and a handwritten card — wrapped in pink silk ribbon.',
    2499, 2999,
    '["https://images.unsplash.com/photo-1606293459209-d197bbd12cc7?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    'gift-hampers',
    '["diwali","gifting","sale"]'::jsonb,
    '{"mood":"Festive"}'::jsonb,
    9, true, false, false, true, 100
  ),
  (
    'p-gift-hamper-rose', 'rose-ritual-hamper', 'Rose Ritual Hamper',
    'Little luxuries, gift-wrapped',
    'A blush mug, Rose Bloom candle, and artisanal tea — curated for the everyday romantic.',
    1999, null,
    '["https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1606293459209-d197bbd12cc7?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    'gift-hampers',
    '["gifting","new-arrivals"]'::jsonb,
    '{"mood":"Romantic"}'::jsonb,
    7, false, true, true, true, 110
  ),
  (
    'p-citrus-candle', 'citrus-bloom-candle', 'Citrus Bloom Candle',
    'Sunshine in a jar',
    'Zesty citrus peel, jasmine, and white tea. Wakes up any room instantly.',
    849, null,
    '["https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1602874801006-e26c7f1063c1?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    'candles',
    '["minimal-home","new-arrivals"]'::jsonb,
    '{"fragrance":"Citrus & Jasmine","colour":"Pale Yellow","mood":"Fresh","material":"Soy wax","size":"180g"}'::jsonb,
    20, false, true, false, true, 120
  ),
  (
    'p-mini-teapot', 'mini-matte-teapot', 'Mini Matte Teapot',
    'Solo tea ceremonies',
    'A single-serve teapot in matte blush — for intentional mornings.',
    1299, null,
    '["https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    'tea-pots',
    '["minimal-home"]'::jsonb,
    '{"colour":"Matte Blush","material":"Stoneware","size":"350ml"}'::jsonb,
    5, false, false, false, true, 130
  ),
  (
    'p-gold-rim-cupsaucer', 'gold-rim-cup-saucer', 'Gold Rim Cup & Saucer',
    'Classic, reimagined',
    'Porcelain cup and saucer with a hand-applied 22k gold rim. Set of 2.',
    1799, null,
    '["https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    'cup-saucer',
    '["gifting","diwali"]'::jsonb,
    '{"colour":"Ivory & Gold","material":"Porcelain"}'::jsonb,
    3, false, false, true, true, 140
  ),
  (
    'p-pastel-candle-trio', 'pastel-candle-trio', 'Pastel Candle Trio',
    'Three moods in one box',
    'A trio of our top candles — Rose Bloom, Lavender Haze, Citrus Bloom — in a gift box.',
    2199, 2597,
    '["https://images.unsplash.com/photo-1602874801006-e26c7f1063c1?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    'gift-hampers',
    '["gifting","sale","new-arrivals"]'::jsonb,
    '{"mood":"Variety"}'::jsonb,
    10, true, true, false, true, 150
  )
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  tagline = excluded.tagline,
  description = excluded.description,
  price = excluded.price,
  compare_price = excluded.compare_price,
  images = excluded.images,
  category = excluded.category,
  collections = excluded.collections,
  attributes = excluded.attributes,
  stock = excluded.stock,
  is_featured = excluded.is_featured,
  is_new_launch = excluded.is_new_launch,
  is_bestseller = excluded.is_bestseller,
  gift_wrap_available = excluded.gift_wrap_available,
  sort_order = excluded.sort_order,
  updated_at = now();

-- Seed a few reviews for Rose Bloom (matches existing mockData) — stored inline on the product row
update public.products
set reviews = '[
  {
    "id": "r1",
    "author": "Aanya M.",
    "rating": 5,
    "title": "Smells like a spring garden",
    "body": "The fragrance is soft and lingers without being overpowering. The packaging was gorgeous too.",
    "date": "2026-03-14",
    "verified": true
  },
  {
    "id": "r2",
    "author": "Rhea K.",
    "rating": 4,
    "body": "Gorgeous colour. Bought as a gift and it was loved.",
    "date": "2026-02-20",
    "verified": true
  }
]'::jsonb
where id = 'p-rose-bloom';

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
};

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-soy-wax",
    title: "The hands behind every piece - meet the artisans of Kyuto",
    excerpt:
      "Before a ceramic piece reaches your home, it passes through the hands of someone who has spent years, sometimes decades - learning to shape, fire, and finish clay. Here's the story we don't tell enough.",
    cover: `https://res.cloudinary.com/dtyvqag3h/image/upload/q_auto/f_auto/v1776288462/Unique_Bargains_Wooden_Resistance_to_Warping_and_Cracking_Round_Pottery_Wheel_Bat_6_Pcs_6_ledeev.jpg`,
    author: "Kyuto",
    date: "2025-07-20",
    readTime: "2 min",
    tags: ["Candles", "Behind the scenes"],
    body: `Before a Kyuto piece reaches your home, it passes through hands that have spent years, sometimes decades - learning to read clay by touch alone. Centring, throwing, trimming, glazing, firing. Each step done slowly, carefully, by a person who chose this craft as their life's work.
Indian ceramic traditions run deep, and the artisans we work with carry that lineage with quiet pride. No conveyor belts, no shortcuts. Just skill, patience, and a kiln that can't be rushed open until it's ready.

The slight variation in a rim, the way glaze pools a little differently on each piece - that's not a flaw. That's the fingerprint of the person who made it. Your Kyuto piece is, in every real sense, one of a kind.
We started Kyuto because we believed beautiful things deserve to exist in every home and because the people who make them deserve to be known.
- The Kyuto team, Hyderabad.`,
  },
  {
    slug: "slow-mornings-ritual",
    title: "A slow morning ritual, in 3 steps",
    excerpt:
      "You don't need a 12-step routine. A cup of tea, a candle, and five minutes alone can change your whole day.",
    cover: `https://res.cloudinary.com/dtyvqag3h/image/upload/q_auto/f_auto/v1776288635/20_Morning_Self_Care_Activities_to_Kickstart_Your_Day_with_Positivity_Number_11_Is_a_Must_v25pxr.jpg`,
    author: "Sana",
    date: "2025-10-02",
    readTime: "3 min",
    tags: ["Rituals", "Lifestyle"],
    body: `Mornings don't have to be productive to be worthwhile. Sometimes the best thing you can do is simply show up for yourself - slowly, without a to-do list in sight.
Here's our version of a morning that actually feels good: Pick your favourite Kyuto mug - the one that feels right in both hands. Brew something warm, whatever your body is asking for that day. Light a candle, find a quiet corner, and sit with it for five minutes before the world asks anything of you.

No phone. No scroll. Just warmth, stillness, and something beautiful to hold.
It sounds almost too simple. But simple is exactly the point - small rituals done consistently are what make a home feel like a sanctuary. And it all starts with choosing the right cup.`,
  },
  {
    slug: "gifting-hampers-guide",
    title: "The Kyuto gifting guide",
    excerpt:
      "How we think about putting together a hamper that feels personal, not performative.",
    cover: `https://res.cloudinary.com/dtyvqag3h/image/upload/q_auto/f_auto/v1776288801/Artisanal_finds_unique_gifts_and_one_of_a_kind_cgtgjd.jpg`,
    author: "Kyuto Studio",
    date: "2026-01-14",
    readTime: "5 min",
    tags: ["Gifting"],
    body: `Good gifts aren't expensive. They're considered.

    When we put together a Kyuto hamper, we start with one question: what does this person reach for every single day? A morning chai person gets a handcrafted ceramic cup, something that makes their daily ritual feel a little more special. A homebody gets a bowl they'll use at every meal and a candle that makes their space smell like a Sunday.
The gift isn't the object. It's the thought that went into choosing it for that specific person.

Packaging matters more than people admit. A hand-tied ribbon, a small note written on real stationery, tissue paper that crinkles when you open it - these tiny details are what make someone feel genuinely seen, not just gifted.

That's the Kyuto way of giving. Intentional, warm, and always personal.`,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

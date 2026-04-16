"use client";

const REELS: { id: string; shortcode: string }[] = [
  { id: "reel-1", shortcode: "DUsWcpqivnK" },
  { id: "reel-2", shortcode: "DLnZff8TJUt" },
  { id: "reel-3", shortcode: "DJZE6bAyxBh" },
  { id: "reel-4", shortcode: "DJb4RDzISAS" },
];

export function InstagramReels() {
  return (
    <section className="py-8">
      <div className="flex gap-4 overflow-x-auto px-6 snap-x scrollbar-hide">
        {REELS.map((reel) => (
          <div
            key={reel.id}
            className="shrink-0 snap-start rounded-2xl overflow-hidden bg-kyuto-purple-50 shadow-sm"
            style={{ width: 320, height: 560 }}
          >
            <iframe
              src={`https://www.instagram.com/reel/${reel.shortcode}/embed/`}
              width="320"
              height="560"
              frameBorder="0"
              scrolling="no"
              allowTransparency
              allowFullScreen
              title={`Kyuto Instagram Reel ${reel.id}`}
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

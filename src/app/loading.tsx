export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-kyuto">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-kyuto-purple-400 to-kyuto-pink-400 animate-bloom" />
          <div className="absolute inset-2 rounded-full bg-white/80 backdrop-blur flex items-center justify-center">
            <span className="font-heading text-xl text-kyuto-purple-800">K</span>
          </div>
        </div>
        <p className="font-hand text-2xl text-kyuto-purple-700">
          blooming beauty…
        </p>
      </div>
    </div>
  );
}

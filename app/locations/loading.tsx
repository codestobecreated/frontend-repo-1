export default function LoadingLocations() {
  return (
    <main
      className="fixed inset-0 top-0 bg-[#0a0a0a] animate-pulse font-poppins"
      style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
    >
      {/* Sidebar skeleton */}
      <div className="absolute left-0 top-0 h-full w-[400px] bg-[#0a0a0a] border-r border-white/5 z-40 flex flex-col pt-28 px-5 gap-4">
        <div className="h-7 w-48 bg-white/10 rounded-xl mb-2" />
        <div className="h-10 w-full bg-white/5 rounded-xl border border-white/10" />
        <div className="flex gap-2">
          <div className="h-9 flex-1 bg-white/5 rounded-xl border border-white/10" />
          <div className="h-9 flex-1 bg-white/5 rounded-xl border border-white/10" />
        </div>
        <div className="h-8 w-full bg-white/5 rounded-xl border border-white/10" />
        <div className="flex flex-col gap-3 mt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 w-full bg-white/5 rounded-2xl border border-white/5" />
          ))}
        </div>
      </div>
      {/* Map placeholder */}
      <div className="absolute inset-0 left-[400px] bg-[#111] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 opacity-20">
          <div className="w-16 h-16 rounded-full border-4 border-[#00b14f] border-t-transparent animate-spin" />
          <p className="text-white text-[16px] font-bold uppercase tracking-widest">Loading Map...</p>
        </div>
      </div>
    </main>
  );
}

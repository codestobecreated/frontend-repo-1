export default function LoadingFranchise() {
  return (
    <main
      className="bg-black min-h-screen pt-24 animate-pulse font-poppins"
      style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
    >
      <section className="relative w-full py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 mb-14">
            <div className="h-3 w-32 bg-white/10 rounded-full" />
            <div className="h-14 w-64 bg-white/10 rounded-xl" />
            <div className="h-4 w-80 bg-white/5 rounded-full" />
          </div>
          {/* Top 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden h-90">
                <div className="h-48 bg-white/5" />
                <div className="p-5 flex flex-col gap-3">
                  <div className="h-6 w-3/4 bg-white/10 rounded-lg" />
                  <div className="h-3 w-full bg-white/5 rounded-full" />
                  <div className="h-8 w-28 bg-white/10 rounded-lg mt-2" />
                </div>
              </div>
            ))}
          </div>
          {/* Bottom 2 cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden h-55 flex">
                <div className="w-[35%] bg-white/5" />
                <div className="flex-1 p-5 flex flex-col gap-3 justify-center">
                  <div className="h-6 w-3/4 bg-white/10 rounded-lg" />
                  <div className="h-3 w-full bg-white/5 rounded-full" />
                  <div className="h-8 w-28 bg-white/10 rounded-lg mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

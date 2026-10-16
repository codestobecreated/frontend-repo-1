export default function LoadingZeroInvestment() {
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
            <div className="h-14 w-72 bg-white/10 rounded-xl" />
            <div className="h-4 w-80 bg-white/5 rounded-full" />
          </div>
          {/* Content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-5">
              <div className="h-5 w-full bg-white/5 rounded-full" />
              <div className="h-5 w-5/6 bg-white/5 rounded-full" />
              <div className="h-5 w-4/5 bg-white/5 rounded-full" />
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-white/5 rounded-2xl border border-white/10" />
                ))}
              </div>
              <div className="h-12 w-48 bg-[#00b14f]/20 rounded-xl border border-[#00b14f]/20 mt-4" />
            </div>
            <div className="bg-white/5 rounded-2xl border border-white/10 h-[420px]" />
          </div>
        </div>
      </section>
    </main>
  );
}

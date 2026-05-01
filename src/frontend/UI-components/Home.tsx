import { useContext } from "react";
import { AppContext } from "../context-files/context-api";

export default function Home() {
  const {updateLocation} = useContext(AppContext);
  return (
    <div className="min-h-screen bg-[#0c0a08] text-[#f0ebe3] overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0c0a08]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">

          <span className="font-serif text-2xl font-light tracking-widest uppercase cursor-pointer text-[#f0ebe3]">
            Book<span className="text-[#c49a5a] italic">Store</span>
          </span>

          <ul className="hidden md:flex items-center gap-10 list-none">
            {["Browse", "Genres", "About"].map((link) => (
              <li key={link}>
                <span className="text-[0.72rem] tracking-[0.14em] uppercase text-[#5a5248] hover:text-[#f0ebe3] transition-colors duration-200 cursor-pointer">
                  {link}
                </span>
              </li>
            ))}
          </ul>

          <button 
          onClick={()=>updateLocation('Login')}
          className="text-[0.7rem] tracking-[0.16em] uppercase font-medium border border-white/10 text-[#f0ebe3] px-5 py-2.5 hover:border-[#c49a5a] hover:text-[#c49a5a] transition-all duration-300 cursor-pointer">
            Sign In
          </button>

        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-20">

        {/* Deep amber glow — center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 rounded-full bg-[radial-gradient(ellipse,rgba(196,154,90,0.07)_0%,transparent_65%)] pointer-events-none" />

        {/* Subtle top vignette */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-linear-to-b from-[#0c0a08] to-transparent pointer-events-none" />

        {/* Decorative rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-140 h-140 rounded-full border border-white/4 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-97.5 h-97.5 rounded-full border border-[#c49a5a]/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full border border-white/3 pointer-events-none" />

        {/* Corner accent dots */}
        <div className="absolute top-32 left-16 w-1 h-1 rounded-full bg-[#c49a5a]/40" />
        <div className="absolute top-48 left-32 w-0.5 h-0.5 rounded-full bg-[#c49a5a]/20" />
        <div className="absolute top-40 right-20 w-1 h-1 rounded-full bg-[#c49a5a]/30" />
        <div className="absolute bottom-40 left-24 w-0.5 h-0.5 rounded-full bg-[#c49a5a]/20" />
        <div className="absolute bottom-32 right-16 w-1 h-1 rounded-full bg-[#c49a5a]/40" />

        {/* Eyebrow */}
        <div className="relative flex items-center gap-3 mb-10">
          <span className="block w-8 h-px bg-[#c49a5a]/60" />
          <p className="text-[0.62rem] tracking-[0.28em] uppercase text-[#c49a5a] font-medium">
            A home for readers
          </p>
          <span className="block w-8 h-px bg-[#c49a5a]/60" />
        </div>

        {/* Headline */}
        <h1 className="relative font-serif text-[clamp(3rem,7vw,6.5rem)] font-light leading-[1.04] text-[#f0ebe3] max-w-4xl mb-10">
          Every great story<br />
          begins with a <span className="italic text-[#c49a5a]">single page.</span>
        </h1>

        {/* Thin rule */}
        <div className="relative w-16 h-px bg-[#c49a5a]/30 mb-10" />

        {/* Subtext */}
        <p className="relative text-[0.92rem] leading-[1.9] text-[#5a5248] font-light max-w-md mb-14">
          BookStore is a quiet corner of the internet for people who still believe 
          a good book can change everything. Curated. Intentional. Yours.
        </p>

        {/* CTAs */}
        <div className="relative flex flex-col sm:flex-row items-center gap-6">
          <button 
          onClick={()=>updateLocation('Login')}
          className="cursor-pointer text-[0.73rem] rounded tracking-[0.2em] uppercase font-medium bg-[#c49a5a] text-[#0c0a08] px-9 py-4 hover:bg-[#f0ebe3] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(196,154,90,0.25)] transition-all duration-300">
            Start Exploring
          </button>
          <span className="text-[0.75rem] tracking-wide text-[#5a5248] hover:text-[#f0ebe3] transition-colors duration-200 cursor-pointer flex items-center gap-2">
            Browse by genre
            <span className="text-[#c49a5a]">→</span>
          </span>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#0c0a08] to-transparent pointer-events-none" />
      </section>

      {/* ── MOOD STRIP ── */}
      <section className="border-t border-white/5 py-16 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

          <div className="flex flex-col items-center gap-3">
            <span className="font-serif text-4xl font-light text-[#c49a5a]">2,400+</span>
            <span className="text-[0.62rem] tracking-[0.2em] uppercase text-[#5a5248]">Curated Titles</span>
          </div>

          <div className="flex flex-col items-center gap-3 md:border-x md:border-white/5 px-8">
            <p className="font-serif text-lg font-light italic text-[#f0ebe3]/70 leading-relaxed">
              "Stories that stay with you long after the last page."
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <span className="font-serif text-4xl font-light text-[#c49a5a]">38</span>
            <span className="text-[0.62rem] tracking-[0.2em] uppercase text-[#5a5248]">Genres</span>
          </div>

        </div>
      </section>

    </div>
  );
}
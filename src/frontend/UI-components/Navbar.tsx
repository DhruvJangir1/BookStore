import { Search, Bell, Command, BookOpen } from 'lucide-react';

export default function Navbar({ crumbs = ['Dashboard','Library', 'Favorites'] }) {
    return (
        <header className="sticky top-0 z-50 h-13 flex items-center justify-between px-5 border-b border-white/6 bg-zinc-950/95 backdrop-blur-xl">

            {/* Left — Logomark + crumbs */}
            <div className="flex items-center gap-4">

                {/* Brand */}
                <div className="flex items-center gap-2.5 pr-4 border-r border-white/8">
                    <div className="w-7 h-7 rounded-lg bg-linear-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center shadow-[0_0_16px_rgba(217,70,239,0.3)]">
                        <BookOpen size={13} className="text-white" strokeWidth={2.5} />
                    </div>
                    <button className="text-[13px] font-semibold text-zinc-100 tracking-tight">Shelfie</button>
                </div>

                {/* Breadcrumbs */}
                <nav className="flex items-center gap-1">
                    {crumbs.map((c, i) => {
                        const isLast = i === crumbs.length - 1;
                        return (
                            <div key={i} className="flex items-center gap-1">
                                {i > 0 && (
                                    <span className="text-zinc-700 text-[13px] select-none px-0.5">/</span>
                                )}
                                <span className={`text-[13px] cursor-pointer select-none rounded-md px-2 py-1 transition-all duration-150 ${
                                    isLast
                                        ? 'text-zinc-100 font-medium bg-white/6'
                                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/4'
                                }`}>
                                    {c}
                                </span>
                            </div>
                        );
                    })}
                </nav>
            </div>

            {/* Right — Actions */}
            <div className="flex items-center gap-1.5">

                {/* Search */}
                <button className="group flex items-center gap-2 h-8 px-3 rounded-lg bg-white/4 border border-white/8 text-zinc-500 hover:bg-white/[0.07] hover:border-white/12 hover:text-zinc-300 transition-all duration-150">
                    <Search size={12} strokeWidth={2.5} />
                    <span className="text-xs hidden sm:block tracking-wide">Search</span>
                    <span className="hidden sm:flex items-center gap-0.5 ml-0.5 pl-2 border-l border-white/8">
                        <Command size={10} className="text-zinc-600 group-hover:text-zinc-500 transition-colors" />
                        <span className="text-[11px] text-zinc-600 group-hover:text-zinc-500 font-mono transition-colors">K</span>
                    </span>
                </button>

                {/* Bell — pulsing notification */}
                <button className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white/4 border border-white/8 text-zinc-500 hover:bg-white/[0.07] hover:border-white/12 hover:text-zinc-300 transition-all duration-150">
                    <Bell size={13} strokeWidth={2} />
                    <span className="absolute top-1.25 right-1.25">
                        <span className="absolute inline-flex h-2 w-2 rounded-full bg-fuchsia-400/75 animate-ping" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.7)] border border-zinc-950" />
                    </span>
                </button>

                <div className="w-px h-4 bg-white/8 mx-1" />

                {/* Avatar */}
                <button className="group flex items-center gap-2 h-8 pl-1 pr-2.5 rounded-xl hover:bg-white/4 transition-all duration-150">
                    <div className="w-6.5 h-6.5 rounded-full bg-linear-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_0_2px_rgba(217,70,239,0.25)]">
                        D
                    </div>
                    <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-200 hidden sm:block transition-colors duration-150">
                        Dhruv
                    </span>
                    <svg width="8" height="8" viewBox="0 0 8 8" className="text-zinc-600 group-hover:text-zinc-400 transition-colors hidden sm:block">
                        <path d="M1.5 3L4 5.5L6.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
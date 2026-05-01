import { useState } from "react";
import { toggleFavoriteBook,toggleAddtoLibrary } from "../../../backend/http";
import { useContext } from "react";
import { AppContext } from "../context-files/context-api";
import { Book } from "../index";
type BookCardProps = {
  TheBook: Book;
  toggleFavFx:(id:Number)=>void;
  toggleLibFx:(id:Number)=>void;
};

const genreTheme: Record<string, { accent: string; glow: string }> = {
  "Fiction":   { accent: "196, 154, 90",  glow: "rgba(196,154,90,0.15)"  },
  "Self Help": { accent: "210, 140, 60",  glow: "rgba(210,140,60,0.15)"  },
  "Sci-Fi":    { accent: "150, 180, 170", glow: "rgba(150,180,170,0.12)" },
  "Romance":   { accent: "200, 130, 120", glow: "rgba(200,130,120,0.14)" },
  "Mystery":   { accent: "170, 140, 200", glow: "rgba(170,140,200,0.13)" },
  "History":   { accent: "210, 170, 100", glow: "rgba(210,170,100,0.14)" },
  "Classic":   { accent: "220, 190, 120", glow: "rgba(220,190,120,0.13)" },
  "Business":  { accent: "140, 190, 140", glow: "rgba(140,190,140,0.12)" },
  "Finance":   { accent: "180, 160, 100", glow: "rgba(180,160,100,0.14)" },
};

const fallbackTheme = { accent: "196, 154, 90", glow: "rgba(196,154,90,0.14)" };

export default function BookCard({
  TheBook: { id, title, author, coverUrl, genre, rating, pages, favorite, inLibrary,content },toggleFavFx,toggleLibFx}: BookCardProps) {

  const providedBook = { id, title, author, coverUrl, genre, rating, pages, favorite, inLibrary,content };

  const [fav, setFav] = useState(favorite);
  const [inLib, setInLib] = useState(inLibrary);
  const [pulse, setPulse] = useState(false);

  const { accent, glow } = genreTheme[genre] ?? fallbackTheme;
  const {updateLocation} = useContext(AppContext);

  async function toggleFav(book:Book) {
    setFav(f => !f);
    setPulse(true);
    setTimeout(() => setPulse(false), 350);
    try {
      await toggleFavoriteBook(book.id,fav);
      toggleFavFx(id);
    }
     catch (err) {
      console.error("Failed to update favorite status in BookCard.tsx:", err);
      setFav(f => !f); // Revert on failure
    }
  }
  async function toggleLibrary(book:Book){
    setInLib(prev => !prev);
    try {
      await toggleAddtoLibrary(book.id,inLib);
      toggleLibFx(id);
    }
    catch(err){
      console.error(err, 'in BookCard.tsx');
      setInLib(prev => !prev);
    }
  }
  
  function onRead(bookId?:number){
    updateLocation(`Reading/${bookId}`);
  }

  return (
    <div
      className="group relative w-full rounded-2xl bg-[#0f0d0b]
        border border-white/6 overflow-hidden
        transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        hover:-translate-y-2 hover:scale-[1.01]"
    >
      {/* accent inset border on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10
          opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 0 1px rgba(${accent}, 0.3)` }}
      />

      {/* ambient radial glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-0
          opacity-60 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${glow} 0%, transparent 70%)` }}
      />

      {/* outer bloom */}
      <div
        className="absolute -inset-px rounded-[17px] pointer-events-none -z-10
          opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ boxShadow: `0 0 50px 8px ${glow}` }}
      />

      {/* Cover */}
      <div
        className="relative w-full h-72 overflow-hidden cursor-pointer z-10"
        onClick={()=>onRead(id)}
      >
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />

        {/* spine shadow */}
        <div className="absolute top-0 left-0 bottom-0 w-4 pointer-events-none z-20
          bg-linear-to-r from-black/60 via-black/10 to-transparent" />

        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-20
          bg-linear-to-t from-[#0f0d0b] to-transparent" />

        {/* genre badge */}
        <span className="absolute top-3 right-3 z-30 text-[9px] font-medium
          tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-sm
          bg-[#0c0a08]/70 border border-white/8 text-[#c49a5a]">
          {genre}
        </span>

        {/* hover overlay */}
        <div className="absolute inset-0 z-30 flex items-center justify-center
          bg-[#0c0a08]/60 backdrop-blur-[2px]
          opacity-0 hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => { 
              e.stopPropagation();
              onRead(id);
              e.preventDefault(); 
            }}
            className="flex items-center gap-2 bg-[#c49a5a] hover:bg-[#d4aa6a] text-[#0c0a08]
              text-[13px] font-medium px-5 py-2.5 rounded-full cursor-pointer
              transition-all duration-150 hover:scale-[1.04] active:scale-[0.97]"
          >
            Read now →
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="relative z-10 px-4 pt-2 pb-5">
        <h3 className="font-serif text-[20px] font-light text-[#f0ebe3]
          leading-tight tracking-[-0.01em] line-clamp-2 mb-1">
          {title}
        </h3>
        <p className="text-[11.5px] text-[#5a5248] mb-3">by {author}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-colors duration-200"
                style={{
                  background: i <= rating
                    ? `rgb(${accent})`
                    : "rgba(255,255,255,0.07)",
                }}
              />
            ))}
          </div>
          <span className="text-[11px] text-[#3a3530] tracking-[0.04em]">{pages} pages</span>
        </div>

        {/* pill actions */}
        <div className="flex gap-2 mb-2.5">
          <button
            onClick={()=>toggleFav(providedBook)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2
              rounded-[10px] border text-[11.5px] font-medium cursor-pointer
              transition-all duration-200 active:scale-[0.96]
              ${fav
                ? "bg-[#c49a5a]/10 border-[#c49a5a]/30 text-[#c49a5a]"
                : "bg-white/3 border-white/6 text-[#5a5248] hover:bg-white/6 hover:text-[#f0ebe3]"
              }`}
          >
            <span style={{
              display: "inline-block",
              fontSize: "30px",
              transition: "transform 0.35s ease",
              transform: pulse ? "scale(1.35)" : "scale(1)",
            }}>
              {fav ? "♥" : "♡"}
            </span>
          </button>

          <button
            onClick={()=>toggleLibrary(providedBook)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2
              rounded-[10px] border text-[11.5px] font-medium cursor-pointer
              transition-all duration-200 active:scale-[0.96]
              ${inLib
                ? "bg-[#c49a5a]/10 border-[#c49a5a]/30 text-[#c49a5a]"
                : "bg-white/3 border-white/6 text-[#5a5248] hover:bg-white/6 hover:text-[#f0ebe3]"
              }`}
          >
            {inLib ? "▼" : "+"} {inLib ? "In Library" : "Library"}
          </button>
        </div>

        {/* read CTA */}
        <button
          onClick={()=>onRead(id)}
          className="w-full py-2.5 rounded-[10px] text-[12.5px] font-medium
            text-[#0c0a08] tracking-[0.06em] cursor-pointer border-none
            transition-all duration-200 hover:-translate-y-px active:scale-[0.98]"
          style={{
            background: `rgb(${accent})`,
            boxShadow: `0 4px 20px ${glow}`,
          }}
        >
          Open Book →
        </button>
      </div>


    </div>
  );
}
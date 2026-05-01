import { useContext, useEffect, useState } from "react"
import { fetchSpecificBook } from "../../../backend/http"
import { Book } from '../index'
import { AppContext } from "../context-files/context-api";
import Navbar from "../UI-components/Navbar";

type BookPagesProps = {
    BookId: number;
}

export default function BookPages({ BookId }: BookPagesProps) {
    const [bookReading, setBookReading] = useState<Book | null>(null);
    const [error, setError] = useState<null | string>(null);

    const { updateLocation,history } = useContext(AppContext);

    useEffect(() => {
        async function fetchTheBooks() {
            try {
                const response = await fetchSpecificBook(BookId);
                setBookReading(response);
            } catch (err) {
                setError('failed to find book...');
                console.error(err);
            }
        }
        fetchTheBooks();
    }, [BookId])

    function Backout() {
        updateLocation(history || 'Dashboard');

    }

    return (
        <div className="min-h-screen  bg-stone-950 flex flex-col">
            <Navbar />

            <div className="flex flex-1 pt-14 mr-35">

                <main className="ml-56 flex-1 flex justify-center px-8 py-12">
                    
                    {error && (
                        <p className="text-red-400 font-mono text-sm mt-20">{error}</p>
                    )}

                    {!error && !bookReading && (
                        <p className="text-stone-600 font-mono text-sm mt-20 animate-pulse">loading...</p>
                    )}


                   {!error && bookReading && (
                    
    <article className="relative w-full max-w-2xl">
        
        <button
            style ={{cursor:"pointer"}}
            onClick={Backout}
            className="text-2xl group flex items-center gap-2 text-stone-500 hover:text-amber-400 transition-colors duration-200 font-mono mb-10">
                
            <span className="text-4.5xl group-hover:-translate-x-1 transition-transform duration-200">←</span>
            back
        </button>
        <div className="absolute -top-2 right-0 text-stone-600 font-mono text-xs tracking-widest">
            p. {bookReading.id}
        </div>

        <div className="flex items-center gap-3 mb-10">
            <div className="flex-1 h-px bg-stone-800" />
            <span className="text-amber-700 text-xs">✦</span>
            <div className="flex-1 h-px bg-stone-800" />
        </div>

        <header className="mb-10 text-center">
            <h1 className="font-serif text-4xl text-stone-100 leading-tight mb-3">{bookReading.title}</h1>
            <p className="text-stone-500 text-sm font-mono tracking-widest uppercase">{bookReading.author}</p>
        </header>

        <div className="flex items-center gap-3 mb-10">
            <div className="flex-1 h-px bg-stone-800" />
            <span className="text-stone-700 text-xs">◆</span>
            <div className="flex-1 h-px bg-stone-800" />
        </div>

        <div className="font-serif text-stone-300 text-xl leading-[1.9] tracking-wide whitespace-pre-wrap">
            {bookReading.content}
        </div>

        <div className="flex items-center gap-3 mt-16">
            <div className="flex-1 h-px bg-stone-800" />
            <span className="text-amber-700 text-xs">✦</span>
            <div className="flex-1 h-px bg-stone-800" />
        </div>
    </article>
)}
                </main>
            </div>
        </div>
    )
}
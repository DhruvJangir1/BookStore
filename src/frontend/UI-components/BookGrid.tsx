import { fetchBooks, toggleFavoriteBook } from '../../../backend/http';
import type { Book } from '../index';
import {  useEffect, useState } from 'react';
import Sidebar from '../UI-components/Sidebar';
import Navbar from '../UI-components/Navbar';
import BookCard from '../Books/BookCard';

type BookGridProps = {
    filter: 'Library' | 'Favorite' | 'Dashboard';
}

export default function BookGrid({ filter }: BookGridProps) {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<null | any>(null);

    useEffect(() => {
        async function fetchTheBooks() {
            try {
                const response = await fetchBooks();
                setBooks(response);
            } catch (err) {
                setError(err);
            }
        }
        fetchTheBooks();
    }, []);

   function handleToggleLibFx(id:Number){
    setBooks(prev =>
        prev.map(book => book.id === id ? { ...book, inLibrary: !book.inLibrary } : book)
    );
   }
   function handleToggleFavFx(id:Number){
    setBooks(prev =>
        prev.map(book => book.id === id ? { ...book, favorite: !book.favorite } : book)
    );
   }

    function checkFilter(filter:String){
        switch (filter){
            case 'Library':
                return books.filter(book => filter === `Library` && book.inLibrary);
            case 'Favorite':
                return books.filter(book => filter === `Favorite` && book.favorite);
            default:
                return books;
        }
    }
    
    const visible = checkFilter(filter);
    function findEmptyDataMessage(){
        return (
            <>
     {filter ==='Dashboard' && 
                     <div className="w-full text-center py-20 text-[#5a5248]">Loading...</div>
                    }
    {filter ==='Library' && 
        <div className="w-full text-center py-20 text-[#5a5248]">
            Your library is empty. Start adding books to see them here!
            </div>
        }
        
    {filter ==='Favorite' && 
        <div className="w-full text-center py-20 text-[#5a5248]">
            You haven't favorited any books yet. Click the heart icon on a book to add it here!
            </div>
        
    }
    </>
    )}
                     
    const EmptyDataMessage = findEmptyDataMessage();

    return (
        <div className="flex bg-zinc-950 text-white">
            <Sidebar />

            <div className="flex-1 flex flex-col min-h-screen">
                <Navbar crumbs={['Home', filter]} />

                <section className="px-10 py-12">

                    {/* Header */}
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <p className="text-[0.6875rem] uppercase tracking-widest text-[#4e4b65] mb-1">
                                Collection
                            </p>
                            <h2 className="text-[2rem] font-semibold text-[#f4f0ff]" style={{ letterSpacing: '-0.02em' }}>
                                {filter}
                            </h2>
                        </div>
                        <span className="text-[0.8125rem] text-[#4e4b65]">{visible.length} titles</span>
                    </div>

                    {error && <p className="text-red-500 text-center">Error loading books.</p>}

                    {!error && visible.length === 0  &&  EmptyDataMessage}

                    {!error && visible.length > 0 && (
                        <div className="grid grid-cols-3 gap-6">
                            {visible.map(book => (
                                <div
                                    key={book.id}
                                    className="group relative w-full h-145 flex flex-col rounded-2xl bg-[#0f0d0b] border border-white/6 overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 hover:scale-[1.01]"
                                >
                                   <BookCard TheBook={book} toggleFavFx={handleToggleFavFx} toggleLibFx={handleToggleLibFx}/>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
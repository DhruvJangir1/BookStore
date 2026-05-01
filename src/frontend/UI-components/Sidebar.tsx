import  { useContext, useState } from 'react';
import { BookOpen, Heart, LayoutDashboard, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { AppContext } from '../context-files/context-api';

const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'Library',   icon: <BookOpen size={18} /> },
    { label: 'Favorite', icon: <Heart size={18} /> },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const {updateLocation,location} = useContext(AppContext);


    return (
        <aside className={`flex flex-col h-screen bg-zinc-900 border-r border-zinc-800/50 shrink-0 transition-all duration-300 ${isOpen ? 'w-52' : 'w-14'}`}>

            {/* Header */}
            <div className="flex items-center h-16 px-3 border-b border-zinc-800/50">
                {isOpen && (
                    <span className="text-sm font-semibold text-zinc-100 mr-auto">ReadShelf</span>
                )}
                <button
                style ={{cursor:'pointer'}}
                    onClick={() => setIsOpen(prev => !prev)}
                    className={`flex items-center justify-center w-8 h-8 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors ${!isOpen ? 'mx-auto' : ''}`}
                >
                    {isOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
                </button>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-1 px-2 py-4">
                {navItems.map(item => {
                    return (
                        <button
                            style ={{cursor:'pointer'}}
                            key={item.label}
                            onClick={()=>updateLocation(item.label)}
                            className={`relative flex items-center gap-3 px-2 py-2 rounded-md transition-colors ${isOpen ? '' : 'justify-center'} ${location !== '' ? 'bg-zinc-800/80 text-zinc-100' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'}`}
                        >
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-fuchsia-500 rounded-full" />
                            <span className="shrink-0">{item.icon}</span>
                            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}
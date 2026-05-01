export type { AppContextType } from '../frontend/context-files/context-type';

export interface LibraryItem {
    id: number;
    title: string;
    author: string;
    description: string;
    thumbnail: string;
    genre: string;
    rating: number;
    pages: number;
    isFavorite: boolean;
    inLibrary: boolean;
}

export interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    children?: NavItem[];
}

export interface FilterOption {
    label: string;
    value: 'all' | 'favorites' | 'library';
}

export type Book = {
  id:number,
  title: string;
  author: string;
  coverUrl: string;
  genre: string;
  rating: number;
  pages: number;
  favorite: boolean;
  inLibrary: boolean;
  content: string;
};

export type userData = {
    name:String,
    email:String,
    password:String
}
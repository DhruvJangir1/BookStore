import { userData } from "../src/frontend/index";

const BASE_URL = 'http://localhost:3000';

export async function fetchBooks() {  
    try {
        const response = await fetch(`${BASE_URL}/books`);
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
}

export async function fetchSpecificBook(BookId:Number){
    try{
        const response = await fetch(`${BASE_URL}/books/${BookId}`);
        if (!response.ok){
            throw new Error('Failed to fetch specific book.');
        }
        const data = await response.json();
        return data;
    }
    catch(err){
        console.error(err);
        return [];
    }
}

export async function toggleFavoriteBook(bookId:Number,bookFavorite:boolean){
    try {
    const response = await fetch(`${BASE_URL}/books/${bookId}/toggleFav`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({favorite:!bookFavorite})
        })
        if (!response.ok){
            throw new Error('Failed to add to favorite AT TOGGLE FAVORITE BOOK FUNCTION http.js')
        }
        const data = await response.json();
        return data;
    }
    catch (error) {        
        console.error('Error updating favorite status:', error);
        throw error;
    }
}

export async function toggleAddtoLibrary(bookID:Number,BookinLibrary:boolean){
    try {
        const response = await fetch(`${BASE_URL}/books/${bookID}/toggleLib`,
            {
                method:'PATCH',
                headers  : {
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify({inLibrary:!BookinLibrary})
            }
        )
        if (!response.ok){
                throw new Error ('Failed to fetch book id for library function.')
            }
            
        const data = await response.json();
        return data;
    }

    catch (err){
        console.error(err);
        throw err;
    }
}
export async function handleUserLogin(userData:userData){
    try{
        const response = await fetch(`${BASE_URL}/userData`,
            {
             method:'PUT',
                headers  : {
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify(userData)
            }
        )
        if (!response.ok){
            throw new Error('Failed to Login');
        }
        const data = await response.json();
        return data;
        
    }
    catch(err){
        console.error(err);
        throw err;
    }
}
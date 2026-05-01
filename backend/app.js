import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { readFile, writeFile } from 'fs/promises';
import { Redo } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
const app = express();

app.use(helmet()); // Protects against common web vulnerabilities
app.use(cors());   // Manages Cross-Origin Resource Sharing
app.use(express.json()); // Essential: Parses JSON bodies for your POST/PUT requests

const PORT = 3000;

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

//login
app.put('/userData',async (req,res)=>{
  try{
    const userData = req.body;
    await writeFile('./data/user_data.json',JSON.stringify(userData,null,2));
    res.json(userData);
  }
  catch(err){
    console.error(err);
    res.status(500).json({error:'Server Error!'})
  }
})


// fetch books
app.get('/books', async (req, res) =>{
        const response = await readFile('./data/books.json', 'utf-8')
        res.json(JSON.parse(response));
});

//Fetch specific book
app.get('/books/:id', async (req,res)=>{
  try{
    console.log('id before being numbered: ', req.params.id);
    const bookId = Number(req.params.id);
    const books = await readFile(`./data/books.json`,'utf-8');

    const objectBooks = JSON.parse(books);
    const theBookIndex = objectBooks.findIndex((i)=> i.id === bookId);

    const theBookNeeded = objectBooks[theBookIndex];

    if (!theBookNeeded){
      res.status(404).json({ error: 'No book found' });
    }

    res.json(theBookNeeded);
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'SERVER_ERROR' });
  }
})

// Toggle favorite
app.patch('/books/:id/toggleFav', async (req, res) => {
  try {
    const bookId = Number(req.params.id);
    const isFav = req.body.favorite

    const fileData = await readFile('./data/books.json', 'utf-8');
    const books = JSON.parse(fileData);

    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex === -1) {
      return res.status(404).json({ error: 'No book found' });
    }

    if (isFav !== null && isFav !== undefined){
    books[bookIndex].favorite = req.body.favorite
    }
    else{
      res.status(404).json({ error: 'request is invalid' });
    }


    await writeFile('./data/books.json', JSON.stringify(books, null, 2));
    res.json(books[bookIndex]);
  } catch (error) {
    res.status(500).json({ error: 'SERVER_ERROR' });
  }
});

// Toggle add library book
app.patch('/books/:id/toggleLib', async (req,res)=>{ //req is what the http request passes to this endpoint through the returned value.
  try {
    const response = await readFile('./data/books.json', 'utf-8');
    const bookToToggleLibraryId = Number(req.params.id);
    const totalBooks = JSON.parse(response);

    const isLib = req.body.inLibrary;
    
    const booktoToggleLibraryIndex = totalBooks.findIndex(item=> item.id === bookToToggleLibraryId);

    if (booktoToggleLibraryIndex === -1) {
      return res.status(404).json({ error: "Book not found"})
      }

      if (isLib !== null && isLib !== undefined){
        totalBooks[booktoToggleLibraryIndex].inLibrary = req.body.inLibrary;
      }
      else {
        console.log('req.body.inLibrary is invalid')
      }


    await writeFile('./data/books.json',JSON.stringify(totalBooks,null,2));

    res.json(totalBooks[booktoToggleLibraryIndex])

  }
  catch(err) {
    res.status(500).json({err:'SERVER_ERROR'});
  }
})

app.listen(PORT, () => {
    console.log(`\n🚀 BookStore API is live on http://localhost:${PORT}`);
});
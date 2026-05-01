import { useContext } from "react";
import Home from "./frontend/UI-components/Home";
import AppContextProvider, { AppContext } from "./frontend/context-files/context-api";
import BookGrid from "./frontend/UI-components/BookGrid";
import BookPages from "./frontend/Books/BookPages";
import Login from "./frontend/Login/Login";

function DemoApp(){
    const {location} = useContext(AppContext);
return (
  <>
   {location === '' && <Home />}
   {location === 'Login' && <Login/>}
   {location === 'Dashboard' && <BookGrid filter='Dashboard'/>}
   {location === 'Library' && <BookGrid filter='Library'/>}
   {location === 'Favorite' && <BookGrid filter='Favorite'/>}
   {location.startsWith('Reading') && <BookPages BookId={Number(location.slice(8))} />}
   
  </>
)
}


export default  function App() {
  return (
    <AppContextProvider>
      <DemoApp />
    </AppContextProvider>
  )
}

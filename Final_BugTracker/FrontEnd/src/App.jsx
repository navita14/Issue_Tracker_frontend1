// App.js (or your main component where you set up routes)
import { useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Route } from 'react-router-dom'; // Import 'Route' separately
import Ticket from "./Components/Ticket"; // Import your Ticket component
import Login from "./Components/Login"; // Import your Login component
import SignUp from "./Components/SignUp"; // Import your SignUp component
import Home from "./Components/Home";

// import Dashboard from './Components/Dashboard';


// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route>
//             <Route path="/login" element={<Login />} />
//             <Route path="/logout" element={<Logout />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/ticket" element={<Ticket />} />
//         </Route>
//     )
//   );

function App() {
  const [user, setUser] = useState({})
  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/login" element={<Login user={user} setUser={setUser}/>} />
            {/* <Route path="/logout" element={<Logout user={user} setUser={setUser}/>} /> */}
            <Route path="/signup" element={<SignUp user={user} setUser={setUser}/>} />
            <Route path="/home" element={<Home user={user} setUser={setUser}/>} />
            <Route path="/ticket" element={<Ticket user={user} setUser={setUser}/>} />
        </Route>
    )
  );

  return (
      <>
        <RouterProvider router={router} />
      </>
  );
}

export default App;

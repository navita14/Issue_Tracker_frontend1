import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import Ticket from "./Ticket"; // Import your Home component
// import Login from "./Components/Login"; // Import your Login component
// import SignUp from "./Components/SignUp"; // Import your SignUp component
// import Logout from "./Components/Logout"; // Import your Logout component
// import Navbar from '/Components/Navbar'

// export function trackLoader(){
// }


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Ticket />, 
//     // errorElement: <ErrorPage />
//   },
//   {
//     path: "/login",
//     element: <Login />,
//     // loader: cupsDataLoader,
//     // id: "cups"
//   },
//   {
//     path: "/logout",
//     element: <Logout />,
//     // loader: trackDataLoader
//   },
//   {
//     path: "/signup",
//     element: <SignUp />,
//     // loader: singleTrackDataLoader
//   }
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
)

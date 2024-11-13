/* eslint-disable react/no-unescaped-entities */
///overflow-hidden
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

import Navbar from "./components/shared/Navbar";
import Body from "./components/Body";
import Inbox from "./components/Inbox";
import Mail from "./components/Mail";
import SendMail from "./components/SendMail.jsx";
import Login from "./components/Login.jsx";
import { useSelector } from "react-redux";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <Inbox />,
        },
        {
          path: "/mail/:id",
          element: <Mail />,
        },
      ],
    },
  ]);
  // ! dynamically set the User
  const {user}=useSelector(store=>store.appSlice)
  return (
    <div className="bg-[#F6F8FC] w-screen h-screen overflow-hidden ">
   {
        !user ? (
          <Login />
        ) : (
          <>
            <Navbar />
            <RouterProvider router={router} />
            <div className='absolute w-[30%] bottom-0 right-20 z-10'>
              <SendMail />
            </div>
          </>
        )
      }
    </div>
  );
}

export default App;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { PiDotsNineBold } from "react-icons/pi";
import Avatar from "react-avatar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../../redux/appSlice";
import { motion, AnimatePresence } from "framer-motion";
import {auth} from "../../firebase"
import{ signOut } from "firebase/auth"
import{ setUser} from "../../redux/appSlice"

const Navbar = () => {
  const dispatch = useDispatch();
  // ! Measure Search bar changes
  const [input, setInput] = useState("");

  const [toggle, setToggle] = useState(false);

  const {user}=useSelector(store=>store.appSlice)

  const signOutHandler=()=>{
    signOut(auth).then(()=>{
    dispatch(setUser(null))
    }).catch((err)=>{
      console.log(err);
    })
  }

  useEffect(() => {
    // !dispatch the SetrSearchTest whith the Input
    dispatch(setSearchText(input));
  }, [input]);
  return (
    <div className="flex items-center justify-between mx-3 h-16 gap-10 ">
      <div className="flex items-center ">
        <div className="flex items-center gap-2">
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <GiHamburgerMenu size={"20px"} />
          </div>
          <img
            className="w-10"
            src="https://logos-world.net/wp-content/uploads/2020/11/Gmail-Logo.png"
            alt="Gmail logo"
          />
          <h1 className="text-2xl text-gray-500 font-medium">Gmail</h1>
        </div>
      </div>
      <div className="md:block hidden w-[50%] mr-56">
        <div className="flex items-center justify-center bg-[#EAF1FB] px-2 py-3 rounded-full">
          <IoIosSearch size={"24px"} className="text-gray-700" />
          <input
            type="text"
            // ! get the value for SearchText
            value={input}
            // ! descripbe an onChange Event
            onChange={(e) => setInput(e.target.value)}
            className="rounded-full w-full bg-transparent outline-none px-1"
            placeholder="Search Mail"
          />
        </div>
      </div>
      <div className="md:block hidden">
        <div className="flex items-center gap-2">
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <CiCircleQuestion size={"26px"} />
          </div>
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <CiSettings size={"26px"} />
          </div>
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <PiDotsNineBold size={"26px"} />
          </div>
          <div className="relative cursor-pointer">
            <Avatar
              onClick={() => setToggle(!toggle)}
              src="user?.photoURL"
              size={"45px"}
              round={true}
            />
            <AnimatePresence>
              {toggle && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.1 }}
                  className="absolute right-10 z-20 shadow-lg bg-white rounded-md"
                >
                  <p onClick={signOutHandler} className="p-2 underline">Logout</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

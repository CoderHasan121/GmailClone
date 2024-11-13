/* eslint-disable no-unused-vars */
import React from "react";
import { IoMdMore, IoMdArrowBack } from "react-icons/io";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdDeleteOutline,
  MdOutlineReport,
  MdOutlineMarkEmailUnread,
  MdOutlineWatchLater,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
} from "react-icons/md";
import { BiArchiveIn } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

import { motion } from "framer-motion";

function Mail() {
  const navigate = useNavigate();
  const { selectedEmail } = useSelector((store) => store.appSlice);
  // ! Find the parameters from reaact-router-dom(import {params} from "react-router-dom")
  const params = useParams();
  // ! delete Message
  const deletMailId = async (id) => {
    try {
      // !deleting the message with respect to id
      await deleteDoc(doc(db, "emails", id));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 bg-white rounded-xl mx-5"
    >
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-gray-700 py-2">
          <div
            onClick={() => navigate("/")}
            className="rounded-full p-2 hover:bg-gray-100 cursor-pointer"
          >
            <IoMdArrowBack size={"20px"} />
          </div>
          <div className="rounded-full p-2 hover:bg-gray-100 cursor-pointer">
            <BiArchiveIn size={"20px"} />
          </div>
          <div className="rounded-full p-2 hover:bg-gray-100 cursor-pointer">
            <MdOutlineReport size={"20px"} />
          </div>

          {/*  describe on click event for deletation using params.id */}
          <div
            onClick={() => deletMailId(params.id)}
            className="rounded-full p-2 hover:bg-gray-100 cursor-pointer"
          >
            <MdDeleteOutline size={"20px"} />
          </div>
          <div className="rounded-full p-2 hover:bg-gray-100 cursor-pointer">
            <MdOutlineMarkEmailUnread size={"20px"} />
          </div>
          <div className="rounded-full p-2 hover:bg-gray-100 cursor-pointer">
            <MdOutlineWatchLater size={"20px"} />
          </div>
          <div className="rounded-full p-2 hover:bg-gray-100 cursor-pointer">
            <MdOutlineAddTask size={"20px"} />
          </div>
          <div className="rounded-full p-2 hover:bg-gray-100 cursor-pointer">
            <MdOutlineDriveFileMove size={"20px"} />
          </div>
          <div className="rounded-full p-2 hover:bg-gray-100 cursor-pointer">
            <IoMdMore size={"20px"} />
          </div>
        </div>
        <div>
          <button className="hover:rounded-full hover:bg-gray-100">
            <MdKeyboardArrowLeft size={"24px"} />
          </button>
          <button className="hover:rounded-full hover:bg-gray-100">
            <MdKeyboardArrowRight size={"24px"} />
          </button>
        </div>
      </div>
      <div className="h-[90vh] overflow-y-auto p-4">
        <div className="flex items-center justify-between bg-white gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium">{selectedEmail?.subject}</h1>
            <span className="text-sm bg-gray-200 rounded-md px-2 ">Inbox</span>
          </div>
          <div className="flex-none text-gray-400 my-5 text-sm">
            {/*  Convert the date and time into to Locale Time String */}
            <p>
              {new Date(selectedEmail?.createdAt * 1000).toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="text-gray-500 text-sm">
          <h1 className="">{selectedEmail?.to}</h1>
          <span>to me</span>
          <div className="my-10">
            <p className="text-black">{selectedEmail?.message}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Mail;


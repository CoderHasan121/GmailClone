/* eslint-disable react/jsx-key */

import { useState } from "react";

import { FaCaretDown, FaUserFriends } from "react-icons/fa";
import { GoTag } from "react-icons/go";
import { IoMdMore, IoMdRefresh } from "react-icons/io";
import {
  MdCropSquare,
  MdInbox,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import Message from "./Messages.jsx";

function Inbox() {
  const mailType = [
    {
      icon: <MdInbox size={"20px"} />,
      text: "Primary",
    },
    {
      icon: <GoTag size={"20px"} />,
      text: "Promotions",
    },
    {
      icon: <FaUserFriends size={"20px"} />,
      text: "Social",
    },
  ];

  const [mailTypeSelected, setMailTypeSelected] = useState(0);
  return (
    <div className="flex-1 bg-white rounded-xl mx-5 ">
      <div className="flex items-center justify-between px-4 ">
        <div className="flex items-center gap-1 text-gray">
          <div className="flex items-center gap-1  ">
            <MdCropSquare size={"20px"} />
            <FaCaretDown size={"20px"} />
          </div>
          <div className="p-2  rounded-full hover:bg-gray-100 cursor-pointer">
            <IoMdRefresh size={"20px"} />
          </div>
          <div className="p-2  rounded-full hover:bg-gray-100 cursor-pointer">
            <IoMdMore size={"20px"} />
          </div>
        </div>
        <div className=" flex items-center gap-2">
          <p className="text-md  text-gray-500">1-5 of 1000</p>
          <button className="hover:rounded-full hover:bg-gray-100">
            <MdKeyboardArrowLeft size={"24px"} />
          </button>
          <button className="hover:rounded-full hover:bg-gray-100">
            <MdKeyboardArrowRight size={"24px"} />
          </button>
        </div>
      </div>
      <div className="h-[90vh] overflow-auto  ">
        <div className="flex items-center gap-1 ">
          {mailType.map((items, index) => {
            return (
              <button
                className={`${
                  mailTypeSelected === index
                    ? "border-b-4 border-b-blue-600 "
                    : "border-b-4 border-b-transparent"
                }
                 flex items-center gap-5 w-52 hover:bg-gray-200 p-4 `}
                onClick={() => setMailTypeSelected(index)}
              >
                {items.icon}
                <span>{items.text}</span>
              </button>
            );
          })}
        </div>
        <Message />
      </div>
    </div>
  );
}

export default Inbox;

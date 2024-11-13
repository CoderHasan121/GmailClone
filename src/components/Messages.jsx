/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Message from "./Message";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { setEmails } from "../redux/appSlice";
import { useDispatch, useSelector } from "react-redux";

function Messsages() {
  // ! destructure of email from store
  const { emails } = useSelector((store) => store.appSlice);
  const { searchText } = useSelector((store) => store.appSlice);

  const dispatch = useDispatch();
  // ! Create a temporary email storage
  const [tempEmail, setTempEmail] = useState(emails);
  useEffect(() => {
    const q = query(collection(db, "emails"), orderBy("createdAt", "desc"));
    const unSubscribe = onSnapshot(q, (snapshot) => {
      const allEmails = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(allEmails);
      dispatch(setEmails(allEmails));
    });

    // cleanup
    return () => unSubscribe();
  }, []);
  // ! Filetering the emails from temporary emails Storage variable
  useEffect(() => {
    const filterEmails = emails?.filter((email) => {
      return (
        // !filter with respect to -to,subject and message
        email?.subject?.toLowerCase()?.includes(searchText.toLowerCase()) ||
        email?.to?.toLowerCase()?.includes(searchText.toLowerCase()) || 
        email?.message?.toLowerCase()?.includes(searchText.toLowerCase())
      )
    });
    // ! set the tempEmail
    setTempEmail(filterEmails)
  }, [searchText, emails]);



  return (
    <div >
    {/* Filter dispalay the message from temp without effecting the original data */}
      {tempEmail && tempEmail?.map((email) => <Message email={email} />)}
    </div>
  );
}

export default Messsages;

import Navbar from "../components/navbar/navbar.component";
import Message from "../components/message/message";
import { useRouter } from "next/router";

import { Inter } from "@next/font/google";

const murecho = Inter({
  weight: "400",
  subsets: ["latin"],
});

export default function Layout({ children }) {
  const router = useRouter();
  const { message } = router.query;
  return (
    <div className={`page-layout h-screen ${murecho.className}`}>
      <Navbar />
      {message ? <Message text={message} /> : <div></div>}
      <div className="m-5">{children}</div>

      {/* Footer if needed */}
      {/* Anything Else to be on all pages */}
    </div>
  );
}

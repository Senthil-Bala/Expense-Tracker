import React from "react";
import Survey from "./Survey";
import Navbar from "../NavComponents/Navbar";
import Footer from "../FooterComponents/Footer";
function Main() {
  return (
    <div className="m-2">
      <div>
        <Navbar />
      </div>
      <div className="container text-center">
        <Survey />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Main;

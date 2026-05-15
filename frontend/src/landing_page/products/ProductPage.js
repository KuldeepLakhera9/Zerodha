import React from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";

function ProductPage() {
  return (
    <>
      <NavBar />
      <Hero />
      <LeftSection />
      <RightSection />
      <Universe />
      <Footer />
    </>
  );
}

export default ProductPage;

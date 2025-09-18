"use client"
import Hero from "./component/Home/Hero";
import About from "./component/Home/About";
import Industrie from "./component/Home/Industrie";
import Contacts from "./component/Home/Contacts";
import MoreInfo from "./component/Home/MoreInfo";
import OurTechnology from "./component/Home/OurTechnology";
import OurProject from "./component/Home/OurProject";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Industrie />
      <OurProject />    
      <MoreInfo />
      <OurTechnology />
      <Contacts />
    </>
  );
}

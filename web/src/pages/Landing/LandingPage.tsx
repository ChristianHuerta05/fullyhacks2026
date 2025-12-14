import { Hero } from "./Hero";
import { Header } from "./LandingHeader";
import { FAQ } from "./FAQ";
import { Footer } from "./Footer";
import { Rolls } from "./Rolls";
import { Sponsors } from "./Sponsors";
import { Teams } from "./Teams";
import { AboutUs } from "./AboutUs";
import SunRays from "../../assets/LandingPage/Header/SunRays.svg";
import Atlantis from "../../assets/LandingPage/Background/Atlantis.svg";
export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col w-full items-center justify-center text-slate-100 relative">
      <img src={SunRays} alt="SunRays" className="absolute top-0 z-[-200] w-screen" />
      <Header />
      <Hero />
      <AboutUs />
      <Rolls />
      <Sponsors />
      <Teams />
      <FAQ />
      <div className="h-[3400px]"></div>
      <Footer />
      <img src={Atlantis} alt="Atlantis" className="absolute bottom-0 z-[-200] w-screen" />
    </div>
  );
}

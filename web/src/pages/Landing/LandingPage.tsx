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
    <div className="min-h-screen flex flex-col w-full items-center justify-center text-slate-100 relative overflow-x-hidden">
      <img
        src={SunRays}
        alt="SunRays"
        className="absolute xl:top-0 md:top-[70px] top-[60px] scale-y-200 xl:scale-y-100 z-[-200] xl:w-full   animate-sunrays "
      />

      <Header />
      <Hero />
      <div id="about" className="w-full">
        <AboutUs />
      </div>
      <Rolls />
      <div id="sponsors" className="w-full">
        <Sponsors />
      </div>
      <div id="team" className="w-full">
        <Teams />
      </div>
      <div id="faq" className="w-full">
        <FAQ />
      </div>
      <div className="xl:h-[3400px] lg:h-[2000px] md:h-[1000px] h-[500px]"></div>
      <Footer />
      <img src={Atlantis} alt="Atlantis" className="absolute bottom-0 z-[-200] w-full" />
    </div>
  );
}

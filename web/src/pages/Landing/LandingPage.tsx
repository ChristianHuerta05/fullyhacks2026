import { Hero } from "./Hero";
import { Header } from "./LandingHeader";
import { FAQ } from "./FAQ";
import { Footer } from "./Footer";
import { Rolls } from "./Rolls";
import { Sponsors } from "./Sponsors";
import { Teams } from "./Teams";
import { AboutUs } from "./AboutUs";
import SunRays from "../../assets/LandingPage/Header/SunRays.svg";
export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-slate-100 ">
      <img src={SunRays} alt="SunRays" className="absolute top-0 z-[-200] w-screen" />
      <Header />
      <Hero />
      <AboutUs />
      <Rolls />
      <Sponsors />
      <Teams />
      <FAQ />
      <Footer />
    </div>
  );
}

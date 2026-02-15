import { useState, useEffect } from "react";
import HeroMountains from "../../assets/LandingPage/Hero/HeroMountains.svg";
import SchoolOfFish from "../../assets/LandingPage/Hero/SchoolofFish.svg";
import FullyHacksText from "../../assets/LandingPage/Hero/FullyHacksText.svg";
import Bottle from "../../assets/LandingPage/Hero/Bottle.svg";
import Bubbles1 from "../../assets/LandingPage/Hero/Bubbles1.svg";
import Bubbles2 from "../../assets/LandingPage/Hero/Bubbles2.svg";
import Bubbles3 from "../../assets/LandingPage/Hero/Bubbles3.svg";

export function Hero() {
  const calculateTimeLeft = () => {
    const difference = +new Date("2026-04-05T23:59:59") - +new Date();
    if (difference > 0) {
      return {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
      };
    }
    return { d: 0, h: 0, m: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center text-slate-100 w-full relative mt-5">
      <img src={HeroMountains} alt="Hero Mountains" className="w-full absolute top-0 -z-20" />
      <img
        src={Bubbles1}
        alt="Bubbles 1"
        className="absolute top-[50vh] right-[80%]  z-[1] animate-bubbles1"
      />
      <img
        src={Bubbles2}
        alt="Bubbles 2"
        className="absolute top-[30vh] right-[10%] z-[1] animate-bubbles2"
      />
      <img
        src={Bubbles3}
        alt="Bubbles 3"
        className="absolute top-[10vh] right-[90%] z-[1] animate-bubbles3"
      />
      <img
        src={SchoolOfFish}
        alt="School of Fish"
        className="absolute top-10 right-[-40%] animate-swim z-[-21] xl:w-[300px] md:w-[200px] w-[130px]"
      />

      <img
        src={FullyHacksText}
        alt="Fully Hacks Text"
        className="sm:w-2/3 md:mb-25 mb-10 sm:mt-0 -mt-30 w-[90%] "
      />

      <div className="relative flex flex-col items-center justify-center animate-float xl:mb-30 sm:mb-20 mb-10">
        <h1 className="xl:text-[90px] md:text-[60px] sm:text-[36px] text-[26px] text-[#BEF3FC] font-nemo text-shadow-sm z-20 xl:-mb-8 sm:-mb-6 -mb-7 text-center px-4">
          cd building: csuf cs 24-25
        </h1>

        <div className="relative z-10 flex flex-col items-center justify-center xl:py-20 py-10 xl:px-55 px-10">
          <img
            src={Bottle}
            alt="Bottle Background"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 xl:h-[140%] h-[140%] xl:w-auto md:w-[150%] w-[100%] max-w-none -z-10 pointer-events-none"
          />

          <h1 className="font-picture md:text-[80px] sm:text-[60px] text-[40px] xl:text-[120px] leading-none xl:-translate-x-35 md:-translate-x-18 sm:-translate-x-14 -translate-x-8">
            {timeLeft.d}d : {timeLeft.h}h : {timeLeft.m}m
          </h1>

          <h1 className="font-bagel text-blue-200 sm:text-[24px] md:text-[35px] text-[18px] xl:text-[60px] xl:mx-0 md:mx-24 sm:mx-24 mx-12 eading-none md:-mt-4 xl:-translate-x-35 md:-translate-x-18 sm:-translate-x-14 -translate-x-8">
            until applications close
          </h1>
        </div>
      </div>
      <div className="flex xl:space-x-40 md:space-x-10 space-x-6 xl:mb-20 mb-10">
        <button className="animate-float text-[#BEF3FC] shadow-[0px_4px_4px_rgba(255,255,255,0.25)] font-bagel xl:text-[48px] md:text-[36px] text-[24px] font-bold px-5 py-3 rounded-3xl cursor-pointer backdrop-blur-[100px] border border-[#FFFFFF]/30 rotate-[-1deg]">
          Sponsor Us
        </button>
        <button className="animate-float text-[#BEF3FC] shadow-[0px_4px_4px_rgba(255,255,255,0.25)] font-bagel xl:text-[48px] md:text-[36px] text-[24px] font-bold px-5 py-3 rounded-3xl cursor-pointer backdrop-blur-[100px] border border-[#FFFFFF]/30 rotate-[30deg]">
          Apply
        </button>
      </div>

      <div className="flex xl:space-x-40 md:space-x-20 space-x-10">
        <div className="flex flex-col items-center text-[#BEF3FC]">
          <h1 className="xl:text-[146px] md:text-[86px] text-[56px] font-nemo leading-none">20K</h1>
          <h1 className="xl:text-[84px] md:text-[46px] text-[28px] font-bagel">Hackers</h1>
        </div>
        <div className="flex flex-col items-center text-[#BEF3FC]">
          <h1 className="xl:text-[146px] md:text-[86px] text-[56px] font-nemo leading-none">
            100k
          </h1>
          <h1 className="xl:text-[84px] md:text-[46px] text-[28px] font-bagel">Prizes</h1>
        </div>
      </div>
      <div className="flex flex-col items-center text-[#BEF3FC] md:mt-20 mt-10">
        <h1 className="xl:text-[146px] md:text-[86px] text-[56px] font-nemo leading-none">24</h1>
        <h1 className="xl:text-[84px] md:text-[46px] text-[28px] font-bagel">Hours</h1>
      </div>
    </div>
  );
}

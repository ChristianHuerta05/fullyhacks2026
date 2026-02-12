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
        className="absolute top-10 right-[-40%] animate-swim z-[-1]"
      />

      <img src={FullyHacksText} alt="Fully Hacks Text" className="w-2/3 mb-25" />

      <div className="relative flex flex-col items-center justify-center animate-float mb-30">
        <h1 className="text-[90px] text-[#BEF3FC] font-nemo text-shadow-sm z-20 -mb-8">
          cd building: csuf cs 24-25
        </h1>

        <div className="relative z-10 flex flex-col items-center justify-center py-20 px-55">
          <img
            src={Bottle}
            alt="Bottle Background"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[140%] w-auto max-w-none -z-10 pointer-events-none"
          />

          <h1 className="font-picture text-[80px] md:text-[120px] leading-none -translate-x-35">
            {timeLeft.d}d : {timeLeft.h}h : {timeLeft.m}m
          </h1>

          <h1 className="font-bagel text-blue-200 text-[30px] md:text-[60px] leading-none -mt-2 md:-mt-4 -translate-x-35">
            until applications close
          </h1>
        </div>
      </div>
      <div className="flex space-x-40 mb-20">
        <button className="animate-float text-[#BEF3FC] shadow-[0px_4px_4px_rgba(255,255,255,0.25)] font-bagel text-[48px] font-bold px-5 py-3 rounded-3xl cursor-pointer backdrop-blur-[100px] border border-[#FFFFFF]/30 rotate-[-1deg]">
          Sponsor Us
        </button>
        <button className="animate-float text-[#BEF3FC] shadow-[0px_4px_4px_rgba(255,255,255,0.25)] font-bagel text-[48px] font-bold px-5 py-3 rounded-3xl cursor-pointer backdrop-blur-[100px] border border-[#FFFFFF]/30 rotate-[30deg]">
          Apply
        </button>
      </div>

      <div className="flex space-x-40 ">
        <div className="flex flex-col items-center text-[#BEF3FC] ">
          <h1 className=" text-[146px] font-nemo leading-none">20K</h1>
          <h1 className=" text-[84px] font-bagel">Hackers</h1>
        </div>
        <div className="flex flex-col items-center text-[#BEF3FC] ">
          <h1 className=" text-[146px] font-nemo leading-none">100k</h1>
          <h1 className=" text-[84px] font-bagel">Prizes</h1>
        </div>
      </div>
      <div className="flex flex-col items-center text-[#BEF3FC] mt-20">
        <h1 className="text-[146px] font-nemo leading-none">24</h1>
        <h1 className="text-[84px] font-bagel">Hours</h1>
      </div>
    </div>
  );
}

import JellyFishGroup from "../../assets/LandingPage/AboutUs/JellyFishGroup.svg";
import Frame from "../../assets/LandingPage/AboutUs/Frame.svg";

export function AboutUs() {
  return (
    <div className="relative w-full -mt-0 sm:mt-40  lg:mt-60 max-w-screen  ">
      <h1
        className="
          font-nemo
          absolute left-1/2 -translate-x-1/2
          -top-20 sm:top-0 md:top-0 lg:-top-10 2xl:top-0
          text-[64px] sm:text-[66px] md:text-[72px] lg:text-[104px]
          text-[#BEF3FC]
          whitespace-nowrap
          pointer-events-none
          
        "
      >
        about us
      </h1>

      <img
        src={JellyFishGroup}
        alt="JellyFishGroup"
        className="w-full h-auto block  opacity-0  md:opacity-100"
      />

      <div className="absolute inset-0 flex items-center justify-center sm:px-4 px-2">
        <div className="relative text-center font-bagel w-full ">
          <h2
            className="
              relative z-10
              leading-tight
              text-[22px] sm:text-[35px] md:text-[50px] lg:text-[54px]
            "
          >
            We are Cal State University <br />
            Fullerton&apos;s (CSUF) <br />
            student-run hackathon. <br />
            We plan to host 600 <br />
            students for a 24-hour <br />
            coding event in April 2026.
          </h2>

          <img
            src={Frame}
            alt="Frame"
            className="
              absolute
              left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              z-0 pointer-events-none
              w-full h-full
              scale-[1.6] sm:scale-[1.6] md:scale-[1.6] lg:scale-[1.6]

            "
          />
        </div>
      </div>
    </div>
  );
}

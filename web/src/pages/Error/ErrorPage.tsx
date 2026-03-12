import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import SeaweedL from "../../assets/ApplyPage/SeaweedL.svg";
import SeaweedR from "../../assets/ApplyPage/SeaweedR.svg";
import FullyHacksLogo from "../../assets/FullyHacksLogo.svg";
import FishLeft from "../../assets/ApplyPage/FishLeft.svg";
import FishRight from "../../assets/ApplyPage/FishRight.svg";
import RightArrow from "../../assets/ApplyPage/RightArrow.svg";
import Bubbles1 from "../../assets/LandingPage/Hero/Bubbles1.svg";
import Bubbles2 from "../../assets/LandingPage/Hero/Bubbles2.svg";

export function ErrorPage() {
  const error = useRouteError();

  const is404 = !error || (isRouteErrorResponse(error) && error.status === 404);

  const statusCode = isRouteErrorResponse(error) ? error.status : 404;

  return (
    <div
      className="min-h-screen flex items-center justify-center text-slate-100 overflow-hidden px-4 py-20 sm:py-12 relative"
      style={{ background: "linear-gradient(180deg, #2B7096 0%, #1D244D 100%)" }}
    >
      <img
        src={Bubbles1}
        alt=""
        className="absolute top-[50vh] right-[80%] z-[1] animate-bubbles1 sm:w-auto w-[40px] pointer-events-none"
      />
      <img
        src={Bubbles2}
        alt=""
        className="absolute top-[30vh] right-[10%] z-[1] animate-bubbles2 sm:w-auto w-[40px] pointer-events-none"
      />

      <div
        className="w-full max-w-2xl border-3 sm:border-5 rounded-lg px-6 sm:px-20 gap-4 sm:gap-8 py-8 sm:py-15 border-[#EFEFEF] bg-[#3578A7]/50 flex flex-col items-center justify-center text-[#EFEFEF] z-10"
        style={{ boxShadow: "15px 15px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <img src={FullyHacksLogo} alt="FullyHacks Logo" className="w-24 sm:w-48" />

        <h1
          className="font-nemo text-[#BEF3FC] text-[100px] sm:text-[160px] leading-none"
          style={{ filter: "drop-shadow(0px 6px 0px #3B087D)" }}
        >
          {statusCode ?? "!"}
        </h1>

        <div className="flex flex-col items-center gap-2 text-center">
          <h2
            className="font-bagel text-2xl sm:text-4xl text-[#BEF3FC]"
            style={{ filter: "drop-shadow(0px 4px 0px #3B087D)" }}
          >
            {is404 ? "Lost at Sea!" : "Something went wrong!"}
          </h2>
          <p className="font-baloo text-base sm:text-xl text-[#EFEFEF]/80">
            {is404
              ? "The page you're looking for has drifted into the deep ocean."
              : "An unexpected wave hit us. Try swimming back home."}
          </p>
        </div>

        <Link
          to="/"
          className="font-baloo text-lg sm:text-2xl flex items-center gap-2 sm:gap-4 rounded-2xl bg-[#EFEFEF] p-2 px-4 sm:p-3 sm:px-6 cursor-pointer hover:bg-[#d9d9d9] transition-colors"
          style={{ color: "#3B087D" }}
        >
          Back to Home{" "}
          <img
            src={RightArrow}
            alt=""
            className="w-5 h-5 sm:w-8 sm:h-8"
            style={{ filter: "brightness(0)" }}
          />
        </Link>
      </div>

      <img
        src={SeaweedL}
        alt=""
        className="absolute bottom-0 left-0 z-[2] w-20 sm:w-auto pointer-events-none"
      />
      <img
        src={SeaweedR}
        alt=""
        className="absolute bottom-0 right-0 z-[2] w-20 sm:w-auto pointer-events-none"
      />

      <img
        src={FishLeft}
        alt=""
        className="absolute top-20 left-[-190px] sm:left-[-420px] w-40 sm:w-100 z-[1] animate-swim-left pointer-events-none"
      />
      <img
        src={FishRight}
        alt=""
        className="absolute bottom-20 right-[-200px] sm:right-[-420px] w-40 sm:w-100 z-[1] animate-swim-right pointer-events-none"
      />
    </div>
  );
}

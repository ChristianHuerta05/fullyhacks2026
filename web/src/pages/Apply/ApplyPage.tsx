import SeaweedL from "../../assets/ApplyPage/SeaweedL.svg";
import SeaweedR from "../../assets/ApplyPage/SeaweedR.svg";
import FullyHacksLogo from "../../assets/FullyHacksLogo.svg";
import GithubLogo from "../../assets/ApplyPage/Github.svg";
import { Link, useNavigate } from "react-router-dom";
import RightArrow from "../../assets/ApplyPage/RightArrow.svg";
import FishLeft from "../../assets/ApplyPage/FishLeft.svg";
import FishRight from "../../assets/ApplyPage/FishRight.svg";
import { useAuth } from "../../contexts/useAuth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export function ApplyPage() {
  const { user, loading, signInWithGitHub } = useAuth();
  const navigate = useNavigate();
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (loading || !user) return;
    const checkAndRedirect = async () => {
      const docSnap = await getDoc(doc(db, "applications", user.uid));
      navigate(docSnap.exists() ? "/profile" : "/application");
    };
    checkAndRedirect();
  }, [user, loading, navigate]);

  const handleSignIn = async () => {
    setError("");
    setSigningIn(true);
    try {
      await signInWithGitHub();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Sign-in failed. Please try again.";
      setError(message);
    } finally {
      setSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-slate-100"
        style={{ background: "linear-gradient(180deg, #2B7096 0%, #1D244D 100%)" }}
      >
        <p className="font-baloo text-2xl animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center text-slate-100 overflow-hidden  px-4 py-20 sm:py-12"
      style={{ background: "linear-gradient(180deg, #2B7096 0%, #1D244D 100%)" }}
    >
      <Link
        to="/"
        className="absolute top-4 right-4 sm:top-10 sm:right-10 font-baloo text-base sm:text-2xl border-[#EFEFEF] bg-[#3578A7]/50 border-3 sm:border-5 rounded-lg px-4 py-2 sm:px-8 sm:py-4 flex items-center gap-2 sm:gap-15 z-10"
        style={{ boxShadow: "10px 10px 0px rgba(0, 0, 0, 0.25)" }}
      >
        Back to Home <img src={RightArrow} alt="RightArrow" className="w-6 h-6 sm:w-12 sm:h-12" />
      </Link>
      <div
        className="w-full max-w-2xl border-3 sm:border-5 rounded-lg px-6 sm:px-20 gap-6 sm:gap-12 py-8 sm:py-15 border-[#EFEFEF] bg-[#3578A7]/50 flex flex-col items-center justify-center text-[#EFEFEF] z-10"
        style={{ boxShadow: "15px 15px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <img src={FullyHacksLogo} alt="FullyHacksLogo" className="w-32 sm:w-60" />
        <div className="flex flex-col items-center justify-center gap-2">
          <h1
            className="font-baloo text-2xl sm:text-5xl text-center"
            style={{ filter: "drop-shadow(0px 6px 0px #3B087D)" }}
          >
            WELCOME TO FULLYHACKS!
          </h1>
          <h2 className="font-baloo text-base sm:text-2xl text-center">
            Let's sign in and start your application
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <button
            onClick={handleSignIn}
            disabled={signingIn}
            className="font-baloo text-xl sm:text-3xl flex items-center gap-2 rounded-2xl bg-[#EFEFEF] text-[#3B087D] p-2 px-3 sm:p-3 sm:px-4 cursor-pointer hover:bg-[#d9d9d9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {signingIn ? "Signing in..." : "Sign in with Github"}{" "}
            <img src={GithubLogo} alt="GithubLogo" className="w-8 h-8 sm:w-12 sm:h-12" />
          </button>
          {error && <p className="font-baloo text-sm text-red-400 max-w-sm text-center">{error}</p>}
          <h3 className="font-baloo text-sm sm:text-xl text-center">
            Note: We use Github to keep track of your submission
          </h3>
        </div>
      </div>

      <img
        src={SeaweedL}
        alt="SeaweedL"
        className="absolute bottom-0 left-0 z-[2] w-20 sm:w-auto pointer-events-none"
      />
      <img
        src={SeaweedR}
        alt="SeaweedR"
        className="absolute bottom-0 right-0 z-[2] w-20 sm:w-auto pointer-events-none"
      />
      <img
        src={FishLeft}
        alt="FishLeft"
        className="absolute top-20 left-[-190px] sm:left-[-420px] w-40 sm:w-60 sm:w-100 z-[1] animate-swim-left"
      />
      <img
        src={FishRight}
        alt="FishRight"
        className="absolute bottom-20 right-[-200px] sm:right-[-420px] w-40 sm:w-60 sm:w-100 z-[1] animate-swim-right"
      />
    </div>
  );
}

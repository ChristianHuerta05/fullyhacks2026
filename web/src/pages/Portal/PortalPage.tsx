import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import FullyHacksLogo from "../../assets/FullyHacksLogo.svg";
import Background from "../../assets/ApplicationPage/Background.svg";

interface ApplicationData {
  fullName: string;
  status: string;
  displayName: string;
}

export function PortalPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [appData, setAppData] = useState<ApplicationData | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/apply");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchApp = async () => {
      try {
        const docRef = doc(db, "applications", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAppData(docSnap.data() as ApplicationData);
        }
      } catch (err) {
        console.error("Failed to fetch application:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchApp();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading || fetching) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-slate-100 relative"
        style={{ background: "linear-gradient(180deg, #2C739A 0%, #1D244C 100%)" }}
      >
        <p className="font-baloo text-2xl animate-pulse">Loading...</p>
      </div>
    );
  }

  const displayName = appData?.fullName || appData?.displayName || user?.displayName || "Hacker";

  const statusLabel =
    appData?.status === "pending"
      ? "Pending"
      : appData?.status === "accepted"
        ? "Accepted"
        : appData?.status === "rejected"
          ? "Rejected"
          : appData
            ? "Pending"
            : "No Application";

  const statusColor =
    appData?.status === "accepted"
      ? "text-green-400"
      : appData?.status === "rejected"
        ? "text-red-400"
        : "text-yellow-400";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-slate-100 relative"
      style={{ background: "linear-gradient(180deg, #2C739A 0%, #1D244C 100%)" }}
    >
      <div className="flex flex-col items-center gap-8 z-1 px-4">
        <img src={FullyHacksLogo} alt="FullyHacksLogo" className="w-36 md:w-60" />

        <h1 className="font-nemo text-3xl md:text-6xl text-[#FFF5F5] text-center">
          Welcome, {displayName}!
        </h1>

        <div
          className="w-full max-w-md rounded-2xl p-8 flex flex-col items-center gap-4"
          style={{
            background: "rgba(53, 120, 167, 0.5)",
            border: "3px solid #EFEFEF",
            boxShadow: "10px 10px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <h2 className="font-baloo text-2xl text-[#EFEFEF]">Application Status</h2>
          <div className={`font-baloo text-4xl font-bold ${statusColor}`}>{statusLabel}</div>
          {appData?.status === "pending" && (
            <p className="font-baloo text-base text-[#EFEFEF]/70 text-center">
              Your application is being reviewed. We'll notify you soon!
            </p>
          )}
          {!appData && (
            <div className="flex flex-col items-center gap-3">
              <p className="font-baloo text-base text-[#EFEFEF]/70 text-center">
                You haven't submitted an application yet.
              </p>
              <button
                onClick={() => navigate("/application")}
                className="font-baloo text-lg px-6 py-2 rounded-2xl bg-[#72D6E6] text-[#246B8A] hover:bg-[#5bc0d0] transition-colors cursor-pointer"
              >
                Start Application
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleSignOut}
          className="font-baloo text-lg px-8 py-3 rounded-2xl border-2 border-[#EFEFEF] text-[#EFEFEF] hover:bg-[#EFEFEF]/10 transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </div>

      <img
        src={Background}
        alt="Background"
        className="w-full absolute bottom-0 z-0 pointer-events-none"
      />
    </div>
  );
}

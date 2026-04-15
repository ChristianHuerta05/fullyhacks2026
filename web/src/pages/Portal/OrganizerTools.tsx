import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import type { ParticipantData, CheckInType } from "./OrganizerTools/types";
import { ParticipantCard } from "./OrganizerTools/ParticipantCard";
import { QRScanner } from "./OrganizerTools/QRScanner";
import { NameSearch } from "./OrganizerTools/NameSearch";
import { QuickCheckIn } from "./OrganizerTools/QuickCheckIn";
import { CheckInStats } from "./OrganizerTools/CheckInStats";

type StandardMode = "none" | "scan" | "search";

export function OrganizerTools() {
  const [participants, setParticipants] = useState<ParticipantData[]>([]);
  const [loading, setLoading] = useState(true);
  const [standardMode, setStandardMode] = useState<StandardMode>("none");
  const [selectedParticipant, setSelectedParticipant] = useState<ParticipantData | null>(null);
  const [activeTab, setActiveTab] = useState<"tools" | "stats">("tools");

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const snap = await getDocs(collection(db, "applications"));
        const accepted: ParticipantData[] = [];
        snap.forEach((d) => {
          const data = d.data();
          if (data.status === "accepted") {
            accepted.push({
              userId: d.id,
              firstName: data.firstName ?? "",
              lastName: data.lastName ?? "",
              email: data.email,
              school: data.school,
              major: data.major,
              foodChoice: data.foodChoice,
              checkedIn: data.checkedIn ?? false,
              saturdayDinner: data.saturdayDinner ?? false,
              sundayBreakfast: data.sundayBreakfast ?? false,
              sundayLunch: data.sundayLunch ?? false,
              sundayDinner: data.sundayDinner ?? false,
            });
          }
        });
        setParticipants(accepted);
      } finally {
        setLoading(false);
      }
    };
    fetchParticipants();
  }, []);

  const handleCheckIn = async (userId: string, type: CheckInType) => {
    await updateDoc(doc(db, "applications", userId), { [type]: true });
    // optimistic update
    setParticipants((prev) => prev.map((p) => (p.userId === userId ? { ...p, [type]: true } : p)));
    if (selectedParticipant?.userId === userId) {
      setSelectedParticipant((prev) => (prev ? { ...prev, [type]: true } : prev));
    }
  };

  const handleQRScan = (data: { uid: string; firstName: string; lastName: string }) => {
    const found = participants.find((p) => p.userId === data.uid);
    if (found) {
      setSelectedParticipant(found);
      setStandardMode("none");
    } else {
      setSelectedParticipant({
        userId: data.uid,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      setStandardMode("none");
    }
  };

  const handleNameSelect = (p: ParticipantData) => {
    setSelectedParticipant(p);
    setStandardMode("none");
  };

  const handleUpdateLocal = (userId: string, type: CheckInType) => {
    setParticipants((prev) => prev.map((p) => (p.userId === userId ? { ...p, [type]: true } : p)));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full py-20">
        <p className="font-baloo text-[#EFEFEF] text-xl animate-pulse">Loading participants...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 pb-24">
      <h1 className="font-baloo text-3xl text-[#EFEFEF] font-bold mb-1">Organizer Tools</h1>
      <p className="font-baloo text-[#EFEFEF]/60 text-sm mb-5">
        {participants.length} accepted participants
      </p>

      {/* Tab switcher */}
      <div className="flex gap-2 mb-6">
        {(["tools", "stats"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl font-baloo text-base font-semibold cursor-pointer transition-all duration-150 capitalize ${
              activeTab === tab
                ? "bg-[#2EB2EF] text-white"
                : "bg-white/10 text-[#EFEFEF] hover:bg-white/20"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "stats" && <CheckInStats participants={participants} />}

      {activeTab === "tools" && (
        <div className="flex flex-col gap-6">
          {/* Standard Check-in section */}
          <section
            className="rounded-2xl p-5"
            style={{
              background: "rgba(53, 120, 167, 0.25)",
              border: "1.5px solid rgba(239,239,239,0.2)",
            }}
          >
            <p className="font-baloo text-[#EFEFEF] text-lg font-bold mb-4">Standard Check-in</p>

            {standardMode === "none" && !selectedParticipant && (
              <div className="flex gap-3">
                <button
                  onClick={() => setStandardMode("scan")}
                  className="flex-1 py-3 rounded-xl bg-[#2EB2EF] text-white font-baloo text-lg font-semibold cursor-pointer hover:bg-[#1A9BD8] transition-colors active:scale-95"
                >
                  Scan QR
                </button>
                <button
                  onClick={() => setStandardMode("search")}
                  className="flex-1 py-3 rounded-xl font-baloo text-lg font-semibold cursor-pointer transition-colors active:scale-95"
                  style={{ background: "rgba(53, 120, 167, 0.5)", color: "#EFEFEF" }}
                >
                  Search Name
                </button>
              </div>
            )}

            {standardMode === "scan" && (
              <div>
                <button
                  onClick={() => setStandardMode("none")}
                  className="mb-3 font-baloo text-[#EFEFEF]/60 text-sm cursor-pointer hover:text-[#EFEFEF] transition-colors"
                >
                  ← Back
                </button>
                <QRScanner onScanSuccess={handleQRScan} onClose={() => setStandardMode("none")} />
              </div>
            )}

            {standardMode === "search" && (
              <div>
                <button
                  onClick={() => setStandardMode("none")}
                  className="mb-3 font-baloo text-[#EFEFEF]/60 text-sm cursor-pointer hover:text-[#EFEFEF] transition-colors"
                >
                  ← Back
                </button>
                <NameSearch participants={participants} onSelect={handleNameSelect} />
              </div>
            )}

            {selectedParticipant && (
              <div>
                <button
                  onClick={() => setSelectedParticipant(null)}
                  className="mb-3 font-baloo text-[#EFEFEF]/60 text-sm cursor-pointer hover:text-[#EFEFEF] transition-colors"
                >
                  ← Back
                </button>
                <ParticipantCard participant={selectedParticipant} onCheckIn={handleCheckIn} />
              </div>
            )}
          </section>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/20" />
            <span className="font-baloo text-[#EFEFEF]/40 text-sm whitespace-nowrap">
              Quick Mode
            </span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          {/* Quick Check-in section */}
          <section
            className="rounded-2xl p-5"
            style={{
              background: "rgba(53, 120, 167, 0.25)",
              border: "1.5px solid rgba(239,239,239,0.2)",
            }}
          >
            <p className="font-baloo text-[#EFEFEF] text-lg font-bold mb-4">
              Quick Check-in
              <span className="font-baloo text-[#EFEFEF]/50 text-sm font-normal ml-2">
                — keep camera on for fast throughput
              </span>
            </p>
            <QuickCheckIn
              participants={participants}
              onCheckIn={handleCheckIn}
              onUpdateLocal={handleUpdateLocal}
            />
          </section>
        </div>
      )}
    </div>
  );
}

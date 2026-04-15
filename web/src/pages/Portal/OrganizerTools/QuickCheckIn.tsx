import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Html5Qrcode } from "html5-qrcode";
import { CHECK_IN_TYPES } from "./types";
import type { CheckInType, ParticipantData } from "./types";

interface QuickCheckInProps {
  participants: ParticipantData[];
  onCheckIn: (userId: string, type: CheckInType) => Promise<void>;
  onUpdateLocal: (userId: string, type: CheckInType) => void;
}

type Confirmation = {
  name: string;
  alreadyDone: boolean;
};

export function QuickCheckIn({ participants, onCheckIn, onUpdateLocal }: QuickCheckInProps) {
  const [selectedType, setSelectedType] = useState<CheckInType | null>(null);
  const [scanning, setScanning] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const cooldownRef = useRef(false);
  // Refs so scanner callback always reads latest values without needing a restart
  const participantsRef = useRef(participants);
  const selectedTypeRef = useRef(selectedType);
  // eslint-disable-next-line react-hooks/refs
  participantsRef.current = participants;
  // eslint-disable-next-line react-hooks/refs
  selectedTypeRef.current = selectedType;
  // Build a lookup map for O(1) participant access; keep ref current for scanner callback
  const participantMap = useMemo(
    () => new Map(participants.map((p) => [p.userId, p])),
    [participants],
  );
  const participantMapRef = useRef(participantMap);
  // eslint-disable-next-line react-hooks/refs
  participantMapRef.current = participantMap;

  const stopScanner = useCallback(async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch {
        // ignore cleanup errors
      }
      scannerRef.current = null;
    }
    setScanning(false);
  }, []);

  const startScanner = useCallback(async () => {
    if (scannerRef.current) return;
    const scanner = new Html5Qrcode("quick-checkin-scanner");
    scannerRef.current = scanner;

    try {
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 200, height: 200 } },
        async (decodedText) => {
          if (cooldownRef.current) return;

          let data: { uid?: string; firstName?: string; lastName?: string };
          try {
            data = JSON.parse(decodedText);
          } catch {
            return;
          }

          if (!data.uid || !data.firstName || !data.lastName) {
            setError("Invalid QR code");
            return;
          }

          const participant = participantMapRef.current.get(data.uid!);
          if (!participant) {
            setError("Participant not found");
            cooldownRef.current = true;
            setTimeout(() => {
              cooldownRef.current = false;
              setError(null);
            }, 2000);
            return;
          }

          const type = selectedTypeRef.current;
          if (!type) return;

          const name = `${data.firstName} ${data.lastName}`;
          const alreadyDone = !!participant[type];

          cooldownRef.current = true;
          setConfirmation({ name, alreadyDone });
          setError(null);

          if (!alreadyDone) {
            try {
              await onCheckIn(data.uid!, type);
              onUpdateLocal(data.uid!, type);
            } catch {
              setError("Failed to save — try again");
            }
          }

          setTimeout(() => {
            setConfirmation(null);
            cooldownRef.current = false;
          }, 1800);
        },
        undefined,
      );
      setScanning(true);
      setError(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.toLowerCase().includes("permission")) {
        setError("Camera permission denied");
      } else {
        setError("Could not start camera");
      }
      scannerRef.current = null;
    }
  }, [onCheckIn, onUpdateLocal]);

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, [stopScanner]);

  const handleSelectType = async (type: CheckInType) => {
    setSelectedType(type);
    if (scanning) {
      await stopScanner();
    }
    // start fresh with new type
    setConfirmation(null);
    setError(null);
  };

  const handleStartScan = () => {
    startScanner();
  };

  const handleStop = () => {
    stopScanner();
    setSelectedType(null);
    setConfirmation(null);
    setError(null);
  };

  const activeType = CHECK_IN_TYPES.find((t) => t.key === selectedType);

  return (
    <div className="w-full">
      {/* Type selector */}
      <p className="font-baloo text-[#EFEFEF]/70 text-sm mb-3">Select check-in type:</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {CHECK_IN_TYPES.map((type) => (
          <button
            key={type.key}
            onClick={() => handleSelectType(type.key)}
            className={`
              px-3 py-2 rounded-xl font-baloo text-sm font-semibold cursor-pointer
              transition-all duration-150 active:scale-95
              ${selectedType === type.key ? `${type.bg} ${type.text} ring-2 ring-white/50` : "bg-white/10 text-[#EFEFEF] hover:bg-white/20"}
            `}
          >
            {type.label}
          </button>
        ))}
      </div>

      {selectedType && (
        <div>
          {/* Header showing active type */}
          {activeType && (
            <div
              className={`${activeType.bg} rounded-xl px-4 py-2 mb-4 flex items-center justify-between`}
            >
              <p className={`font-baloo font-bold text-lg ${activeType.text}`}>
                Scanning for: {activeType.label}
              </p>
              <button
                onClick={handleStop}
                className={`font-baloo text-sm ${activeType.text} opacity-70 hover:opacity-100 cursor-pointer transition-opacity`}
              >
                Stop
              </button>
            </div>
          )}

          {/* Scanner viewport */}
          {!scanning && (
            <button
              onClick={handleStartScan}
              className="w-full py-3 rounded-xl bg-[#2EB2EF] text-white font-baloo text-lg font-semibold cursor-pointer hover:bg-[#1A9BD8] transition-colors active:scale-95 mb-3"
            >
              Start Camera
            </button>
          )}

          <div className="relative rounded-xl overflow-hidden">
            <div
              id="quick-checkin-scanner"
              className="w-full"
              style={{ minHeight: scanning ? "260px" : "0px" }}
            />

            {/* Confirmation overlay */}
            <AnimatePresence>
              {confirmation && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`absolute inset-0 flex flex-col items-center justify-center rounded-xl ${
                    confirmation.alreadyDone ? "bg-yellow-500/90" : "bg-green-500/90"
                  }`}
                >
                  <span className="text-6xl mb-2">{confirmation.alreadyDone ? "!" : "✓"}</span>
                  <p className="font-baloo text-white text-2xl font-bold text-center px-4">
                    {confirmation.name}
                  </p>
                  <p className="font-baloo text-white/80 text-base mt-1">
                    {confirmation.alreadyDone ? "Already checked in" : "Checked in!"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {error && <p className="mt-2 font-baloo text-red-300 text-sm text-center">{error}</p>}

          {scanning && !confirmation && (
            <button
              onClick={handleStop}
              className="mt-3 w-full py-2 rounded-xl bg-white/10 text-[#EFEFEF] font-baloo cursor-pointer hover:bg-white/20 transition-colors"
            >
              Stop Scanning
            </button>
          )}
        </div>
      )}
    </div>
  );
}

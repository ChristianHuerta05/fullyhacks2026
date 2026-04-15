import { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QRScannerProps {
  onScanSuccess: (data: { uid: string; firstName: string; lastName: string }) => void;
  onClose: () => void;
}

export function QRScanner({ onScanSuccess, onClose }: QRScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannedRef = useRef(false);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stopSafe = () => {
    try {
      scannerRef.current?.stop().catch(() => {});
    } catch {
      /* not running */
    }
    try {
      scannerRef.current?.clear();
    } catch {
      /* ignore */
    }
    scannerRef.current = null;
  };

  const handleStart = async () => {
    setError(null);
    const scanner = new Html5Qrcode("standard-qr-scanner-div");
    scannerRef.current = scanner;

    try {
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 220, height: 220 } },
        (decodedText) => {
          if (scannedRef.current) return;
          try {
            const data = JSON.parse(decodedText);
            if (data.uid && data.firstName && data.lastName) {
              scannedRef.current = true;
              stopSafe();
              onScanSuccess(data);
            } else {
              setError("Invalid QR code format");
            }
          } catch {
            setError("Invalid QR code — could not parse");
          }
        },
        undefined,
      );
      setStarted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      try {
        scanner.clear();
      } catch {
        /* ignore */
      }
      scannerRef.current = null;
      if (msg.toLowerCase().includes("permission")) {
        setError("Camera permission denied. Please allow camera access and try again.");
      } else {
        setError("Could not start camera: " + msg);
      }
    }
  };

  const handleClose = () => {
    stopSafe();
    onClose();
  };

  return (
    <div className="w-full">
      {!started && !error && (
        <button
          onClick={handleStart}
          className="w-full py-3 rounded-xl bg-[#2EB2EF] text-white font-baloo text-lg font-semibold cursor-pointer hover:bg-[#1A9BD8] transition-colors active:scale-95 mb-3"
        >
          Start Camera
        </button>
      )}

      {error && (
        <div className="p-4 text-center">
          <p className="font-baloo text-red-300 text-base mb-3">{error}</p>
          <button
            onClick={handleClose}
            className="px-6 py-2 rounded-xl bg-[#2EB2EF] text-white font-baloo cursor-pointer"
          >
            Close
          </button>
        </div>
      )}

      <div
        id="standard-qr-scanner-div"
        className="w-full rounded-xl overflow-hidden"
        style={{ minHeight: started ? "280px" : "0px" }}
      />

      {started && (
        <button
          onClick={handleClose}
          className="mt-3 w-full py-2 rounded-xl bg-white/10 text-[#EFEFEF] font-baloo cursor-pointer hover:bg-white/20 transition-colors"
        >
          Cancel
        </button>
      )}
    </div>
  );
}
